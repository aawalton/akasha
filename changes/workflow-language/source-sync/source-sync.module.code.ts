import { IMAGES } from "../images/images.module.code.ts"
import { selectLivePodCommands } from "../pod-selection/pod-selection.module.code.ts"
import type { CIContext, Step } from "../workflow-types/workflow-types.module.code.ts"

interface DeploySourceSyncConfig {
  name: string
  namespace: string
  deployment: string
  syncContainer?: string
  sha: string | ((ci: CIContext) => string)
  dependsOn?: readonly string[]
}

export function deploySourceSync(config: DeploySourceSyncConfig): Step {
  const { name, namespace, deployment } = config
  const syncContainer = config.syncContainer ?? "code-sync"

  const commands = (ci: CIContext): readonly string[] => {
    const sha = typeof config.sha === "function" ? config.sha(ci) : config.sha
    return [
      "set -e",
      `kubectl rollout status deployment/${deployment} -n ${namespace} --timeout=180s`,
      ...selectLivePodCommands({ fnLabel: "deploySourceSync", namespace, deployment }),
      'if [ -z "$POD" ]; then',
      `  echo "deploySourceSync: no Running pod found for name=${deployment} in ${namespace}" >&2`,
      "  exit 1",
      "fi",
      `echo "deploySourceSync: target pod $POD (container ${syncContainer}) → ${sha}"`,
      `CURRENT_HEAD=$(kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- sh -c 'cd /app/repo && git rev-parse HEAD' 2>/dev/null || echo "")`,
      `if [ "$CURRENT_HEAD" = "${sha}" ]; then`,
      `  echo "deploySourceSync: pod HEAD already at ${sha}, skipping fetch/reset"`,
      "  exit 0",
      "fi",
      `kubectl exec -n ${namespace} -c ${syncContainer} "$POD" -- sh -c 'trap "rm -f /app/repo/.git/index.lock" EXIT INT TERM; cd /app/repo && git fetch origin --prune && git reset --hard ${sha}'`,
      `echo "deploySourceSync: pod $POD synced to ${sha}"`,
    ]
  }

  return {
    name,
    image: IMAGES.KUBECTL,
    environment: { HOME: "/var/tmp" },
    commands,
    backendOptions: {
      kubernetes: { serviceAccountName: "pipeline-engine" },
    },
    ...(config.dependsOn && { dependsOn: config.dependsOn }),
  }
}
