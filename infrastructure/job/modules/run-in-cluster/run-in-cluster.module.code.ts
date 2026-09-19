export const IN_CLUSTER = "AKASHA_RUN_IN_CLUSTER"

export const IN_CLUSTER_SET = "1"

export const NODE_NAME = "AKASHA_NODE_NAME"

export function inCluster(): boolean {
  return (process.env[IN_CLUSTER] ?? "") !== ""
}

export function nodeNamed(): string | null {
  const said = process.env[NODE_NAME] ?? ""
  return said === "" ? null : said
}
