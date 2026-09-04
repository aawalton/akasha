import { checkoutPath } from "../ci-container-name/ci-container-name.module.code.ts"
import { type Candidate, textList } from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"

const HEARTBEAT_INTERVAL_SECONDS = 60

export const MAX_ARG_STRLEN = 131072

function outputBlock(candidate: Candidate): string {
  const outputs = textList(candidate.definition.outputs)
  if (candidate.dependsOn.length === 0 && outputs.length === 0) return ""
  const lines = ['__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"']
  for (const each of candidate.dependsOn) {
    lines.push(`[ -f "$__out_dir/${each}.env" ] && . "$__out_dir/${each}.env"`)
  }
  if (outputs.length > 0) {
    const printed = outputs.map((one) => `"${one}=$${one}"`).join(" ")
    lines.push(
      `__write_outputs() { __rc=$?; if [ $__rc -eq 0 ]; then mkdir -p "$__out_dir" && printf '%s\\n' ${printed} > "$__out_dir/$STEP_NAME.env"; fi; return $__rc; }`,
      "trap __write_outputs EXIT"
    )
  }
  return `${lines.join("\n")}\n`
}

function treeIntegrityGate(workspace: string): string {
  return `if command -v git >/dev/null 2>&1 && git -C ${workspace} rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  __ci_missing=$(git -C ${workspace} ls-files --deleted 2>/dev/null || true)
  if [ -n "$__ci_missing" ]; then
    __ci_missing_n=$(printf '%s\\n' "$__ci_missing" | grep -c .)
    __ci_missing_head=$(printf '%s\\n' "$__ci_missing" | head -20 | tr '\\n' ' ')
    echo "ERROR: partial CI tree at ${workspace} (container=$CONTAINER_NAME workflow=$WORKFLOW_NAME step=$STEP_NAME): $__ci_missing_n tracked file(s) missing from the materialized checkout. First missing: $__ci_missing_head" >&2
    exit 4
  fi
fi`
}

export function oversizeRefusal(stepName: string, size: number, shell: string): string {
  return `echo "ERROR: the script for step ${stepName} is ${size} bytes, past the ${MAX_ARG_STRLEN}-byte cap on a single argument to ${shell}. Nothing in it ran. A step script must not carry anything that grows with the size of the change; have the step read it instead." >&2
exit 5`
}

export function buildEntrypoint(candidate: Candidate): string {
  const shell = textList(candidate.definition.shell)
  const interpreter = shell[0] ?? "/bin/sh"
  const workspace = checkoutPath(candidate.pipelineCommit)
  const cdBlock =
    candidate.workflowKind === "preparation"
      ? ""
      : `if [ ! -d ${workspace} ]; then
  echo "ERROR: CI workspace ${workspace} not found on this node (container=$CONTAINER_NAME workflow=$WORKFLOW_NAME step=$STEP_NAME). Preparation may have raced, been skipped, or been garbage-collected." >&2
  exit 3
fi
cd ${workspace}
${treeIntegrityGate(workspace)}`

  const assemble = (body: string): string =>
    [
      `#!${interpreter}`,
      `echo "[step-started] ${candidate.stepName}"`,
      `CI_WS_HEARTBEAT_DIR=${workspace}`,
      `( while true; do [ -d "$CI_WS_HEARTBEAT_DIR" ] && touch "$CI_WS_HEARTBEAT_DIR" 2>/dev/null; sleep ${HEARTBEAT_INTERVAL_SECONDS}; done ) &`,
      "CI_WS_HEARTBEAT_PID=$!",
      `(set -e\n${cdBlock}\n${body}\n)`,
      "EXIT_CODE=$?",
      'kill "$CI_WS_HEARTBEAT_PID" 2>/dev/null || true',
      "exit $EXIT_CODE",
    ].join("\n")

  const commands = textList(candidate.definition.commands).join("\n")
  const whole = assemble(`${outputBlock(candidate)}${commands}`)
  const size = Buffer.byteLength(whole, "utf8")
  if (size <= MAX_ARG_STRLEN) return whole
  return assemble(oversizeRefusal(candidate.stepName, size, interpreter))
}
