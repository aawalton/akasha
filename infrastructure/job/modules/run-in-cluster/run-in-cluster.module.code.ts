import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

export const IN_CLUSTER = "AKASHA_RUN_IN_CLUSTER"

export const IN_CLUSTER_SET = "1"

export const NODE_NAME = "AKASHA_NODE_NAME"

export function inCluster(): boolean {
  return optionalEnv(IN_CLUSTER) !== undefined
}

export function nodeNamed(): string | null {
  return optionalEnv(NODE_NAME) ?? null
}
