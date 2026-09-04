import type { Module } from "@akasha/code-system/module"

export const seaweedfsRbac = {
  id: "01a06860-955d-7013-a610-dc336fd35734",
  pageTypeSlug: "module",
  slug: "seaweedfs-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the seaweedfs namespace",
  code: "ts",
} as const satisfies Module
