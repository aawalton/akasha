import type { Module } from "@akasha/code-system/module"

export const clusterAccess = {
  id: "01a068dd-71dc-7404-a1d1-55b39f5dfbee",
  pageTypeSlug: "module",
  slug: "cluster-access",
  definition: "reaching a buildkit daemon in the cluster from this machine",
  code: "ts",
} as const satisfies Module
