import type { Module } from "@akasha/code-system/module"

export const postgresRbac = {
  id: "01a06860-955d-7010-b4a7-ccd8e4bac5d4",
  pageTypeSlug: "module",
  slug: "postgres-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the postgres namespace",
  code: "ts",
} as const satisfies Module
