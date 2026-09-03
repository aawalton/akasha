import type { Module } from "@akasha/code-system/module"

export const postgrestRbac = {
  id: "01a06860-955d-7011-80f5-4e7398ce2ca6",
  pageTypeSlug: "module",
  slug: "postgrest-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the postgrest namespace",
  code: "ts",
} as const satisfies Module
