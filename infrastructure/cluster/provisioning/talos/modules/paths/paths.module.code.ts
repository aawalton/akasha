import { homedir } from "node:os"
import { resolve } from "node:path"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const SECRET_PAGES_AT = "infrastructure/service/akasha-service/secret/pages/"

export function clusterSecretsSopsPath(): string {
  return resolve(ownRepoRoot(), `${SECRET_PAGES_AT}talos-main-secrets.secret.sops.yaml`)
}

export function clusterTalosconfigPath(cluster: string): string {
  return resolve(homedir(), ".talos", `${cluster}.config`)
}

export function clusterKubeconfigPath(cluster: string): string {
  return resolve(homedir(), ".kube", `talos-${cluster}.yaml`)
}
