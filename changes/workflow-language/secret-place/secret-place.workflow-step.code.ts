import { IMAGES } from "../images/images.module.code.ts"
import { SECRETS, secret } from "../secrets/secrets.module.code.ts"
import type { CIContext, Step } from "../workflow-types/workflow-types.module.code.ts"

const SAYING = "service-system/secrets/secret-saying/secret-saying.module.code.ts"

interface SecretPlaceConfig {
  name: string
  namespace: string
  resource: string
  type?: string
}

export function secretPlaceApply(config: SecretPlaceConfig): Step {
  const { name, namespace, resource, type } = config
  const typed = type === undefined ? "" : ` --type ${type}`
  return {
    name,
    image: IMAGES.CI,
    environment: {
      HOME: "/tmp",
      SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
    },
    commands: (ci: CIContext) => [
      "set -e",
      `SAID=$(bun "${ci.workspace}/${SAYING}" --root "${ci.workspace}" --resource ${resource} --namespace ${namespace}${typed})`,
      `echo "$SAID" | kubectl apply --dry-run=client -n ${namespace} -f -`,
      `echo "$SAID" | kubectl apply -n ${namespace} -f -`,
    ],
    backendOptions: {
      kubernetes: { serviceAccountName: "pipeline-engine" },
    },
  }
}
