import type { Module } from "@akasha/code-system/module"

export const grafanaRbac = {
  id: "01a06860-955d-700a-9977-ba064d58d759",
  pageTypeSlug: "module",
  slug: "grafana-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the grafana namespace",
  code: "ts",
} as const satisfies Module
