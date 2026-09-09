import type { Module } from "@akasha/code/module"

export const clusterNodes = {
  id: "01a07c91-ec6d-7356-be0a-567679e28b6d",
  pageTypeSlug: "module",
  type: "module",
  slug: "cluster-nodes",
  definition: "the hosts the cluster runs on, with the address and account each is reached by",
  code: "ts",
} as const satisfies Module
