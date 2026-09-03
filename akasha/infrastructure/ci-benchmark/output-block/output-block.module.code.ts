import type { StepConfig } from "../local-step-types/local-step-types.module.code.ts"

export function buildOutputBlock(step: StepConfig): string {
  const depNames = step.dependsOn ?? []
  const outputNames = step.outputs ?? []
  if (depNames.length === 0 && outputNames.length === 0) return ""
  const lines: string[] = [`__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"`]
  for (const dep of depNames) {
    lines.push(`[ -f "$__out_dir/${dep}.env" ] && . "$__out_dir/${dep}.env"`)
  }
  if (outputNames.length > 0) {
    const printfArgs = outputNames.map((v) => `"${v}=$${v}"`).join(" ")
    lines.push(
      `__write_outputs() { __rc=$?; if [ $__rc -eq 0 ]; then mkdir -p "$__out_dir" && printf '%s\\n' ${printfArgs} > "$__out_dir/$STEP_NAME.env"; fi; return $__rc; }`,
      "trap __write_outputs EXIT"
    )
  }
  return `${lines.join("\n")}\n`
}
