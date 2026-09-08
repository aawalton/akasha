import type { CIContext } from "../workflow-types/workflow-types.module.code.ts"

export interface SetImageCommandsConfig {
  namespace: string
  deployment: string
  container: string
  extraContainers?: readonly string[]
  tag: string | ((ci: CIContext) => string)
}

export function setImageCommands(config: SetImageCommandsConfig, ci: CIContext): readonly string[] {
  const { namespace, deployment, container, extraContainers, tag } = config
  const resolvedTag = typeof tag === "function" ? tag(ci) : tag
  const pairs = [container, ...(extraContainers ?? [])].map((c) => `${c}=${resolvedTag}`)
  return [
    `CURRENT=$(kubectl get deployment -n ${namespace} ${deployment} -o jsonpath='{.spec.template.spec.containers[?(@.name=="${container}")].image}' 2>/dev/null || true)`,
    `if [ "$CURRENT" = "${resolvedTag}" ]; then`,
    `  echo "[deploy] ${deployment} already running ${resolvedTag} — skipping"`,
    `  exit 0`,
    `fi`,
    `image_digest() {`,
    `  ref="$1"`,
    `  host="\${ref%%/*}"`,
    `  repo_and_tag="\${ref#*/}"`,
    `  t="\${repo_and_tag##*:}"`,
    `  r="\${repo_and_tag%:*}"`,
    `  wget -q -S --spider --header='Accept: application/vnd.oci.image.index.v1+json, application/vnd.docker.distribution.manifest.v2+json, application/vnd.docker.distribution.manifest.list.v2+json, application/vnd.oci.image.manifest.v1+json' "http://\${host}/v2/\${r}/manifests/\${t}" 2>&1 | grep -i 'docker-content-digest:' | awk '{print $2}' | tr -d '\\r'`,
    `}`,
    `if [ -n "$CURRENT" ]; then`,
    `  CURRENT_DIGEST=$(image_digest "$CURRENT" 2>/dev/null || true)`,
    `  DESIRED_DIGEST=$(image_digest "${resolvedTag}" 2>/dev/null || true)`,
    `  if [ -n "$CURRENT_DIGEST" ] && [ "$CURRENT_DIGEST" = "$DESIRED_DIGEST" ]; then`,
    `    echo "[deploy] ${deployment} image bytes identical ($CURRENT_DIGEST) — skipping rollout"`,
    `    exit 0`,
    `  fi`,
    `fi`,
    `kubectl set image -n ${namespace} deployment/${deployment} ${pairs.join(" ")}`,
  ]
}
