import type { Module } from "@akasha/code-system/module"

export const lokiRbac = {
  id: "01a06860-955d-700c-b3af-3f9ec32436f5",
  pageTypeSlug: "module",
  slug: "loki-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the loki namespace",
  code: "ts",
} as const satisfies Module
