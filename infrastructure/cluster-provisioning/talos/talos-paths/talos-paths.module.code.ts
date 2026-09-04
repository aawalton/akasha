import { homedir } from "node:os"
import { resolve } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"

const CLUSTER_PAGES_AT = "akasha/machines/clusters/pages/"

export function clusterSecretsSopsPath(cluster: string): string {
  return resolve(ownRepoRoot(), `${CLUSTER_PAGES_AT}${cluster}.cluster.sops.yaml`)
}

export function clusterTalosconfigPath(cluster: string): string {
  return resolve(homedir(), ".talos", `${cluster}.config`)
}

export function clusterKubeconfigPath(cluster: string): string {
  return resolve(homedir(), ".kube", `talos-${cluster}.yaml`)
}
