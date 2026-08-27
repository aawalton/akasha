import { homedir } from "node:os"
import { resolve } from "node:path"

const SECRETS_DIR = "pages/cluster/"

export function clusterSecretsSopsPath(cluster: string): string {
  const repoRoot = resolve(import.meta.dir, "../../../../..")
  return resolve(repoRoot, `${SECRETS_DIR}${cluster}.sops.yaml`)
}

export function clusterTalosconfigPath(cluster: string): string {
  return resolve(homedir(), ".talos", `${cluster}.config`)
}

export function clusterKubeconfigPath(cluster: string): string {
  return resolve(homedir(), ".kube", `talos-${cluster}.yaml`)
}
