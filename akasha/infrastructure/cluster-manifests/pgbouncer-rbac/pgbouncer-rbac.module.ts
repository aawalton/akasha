import type { Module } from "@akasha/code-system/module"

export const pgbouncerRbac = {
  id: "01a06860-955d-700e-a40f-80d0c90977ee",
  pageTypeSlug: "module",
  slug: "pgbouncer-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the pgbouncer namespace",
  code: "ts",
} as const satisfies Module
