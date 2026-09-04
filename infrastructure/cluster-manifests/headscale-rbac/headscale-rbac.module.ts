import type { Module } from "@akasha/code-system/module"

export const headscaleRbac = {
  id: "01a06860-955d-700b-9fec-3eede09cb472",
  pageTypeSlug: "module",
  slug: "headscale-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the headscale namespace",
  code: "ts",
} as const satisfies Module
