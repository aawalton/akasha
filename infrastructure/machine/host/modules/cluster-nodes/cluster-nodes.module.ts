import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterNodes = {
  id: "01a07c91-ec6d-7356-be0a-567679e28b6d",
  type: "page-type/module",
  slug: "cluster-nodes",
  definition: "the hosts the cluster runs on, with each host's address and account",
  code: "ts",
} as const satisfies Module
