export const IN_CLUSTER = "AKASHA_RUN_IN_CLUSTER"

export const IN_CLUSTER_SET = "1"

export function inCluster(): boolean {
  return (process.env[IN_CLUSTER] ?? "") !== ""
}
