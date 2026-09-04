import { IMAGES } from "../images/images.module.code.ts"
import { rollbackImageCommands } from "../rollback-image/rollback-image.module.code.ts"
import { setImageCommands } from "../set-image/set-image.module.code.ts"
import { verifyRolloutCommands } from "../verify-rollout/verify-rollout.module.code.ts"
import type { CIContext, Step } from "../workflow-types/workflow-types.module.code.ts"

interface DeploySetImageConfig {
  name: string
  namespace: string
  deployment: string
  container: string
  extraContainers?: readonly string[]
  tag: string | ((ci: CIContext) => string)
  dependsOn?: readonly string[]
}

export function deploySetImage(config: DeploySetImageConfig): Step {
  const { name, namespace, deployment } = config

  const commands = (ci: CIContext): readonly string[] => {
    const verifyCmd = `timeout 180 ${verifyRolloutCommands({ namespace, deployment }).join(" && ")}`
    return [
      "set -e",
      ...setImageCommands(config, ci),
      `if ! ${verifyCmd}; then`,
      `  echo "Rollout failed — rolling back to previous revision"`,
      ...rollbackImageCommands({ namespace, deployment }).map((l) => `  ${l}`),
      `  ${verifyCmd}`,
      "  exit 1",
      "fi",
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
