import type { Module } from "@akasha/code-system/module"

export const prometheusRbac = {
  id: "01a06860-955d-7012-91ea-1d421f1de8a8",
  pageTypeSlug: "module",
  slug: "prometheus-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the prometheus namespace",
  code: "ts",
} as const satisfies Module
