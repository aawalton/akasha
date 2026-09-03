import type { Module } from "@akasha/code-system/module"

export const cloudnativePgRbac = {
  id: "01a06860-955d-7006-a3c6-419fb8ea5b50",
  pageTypeSlug: "module",
  slug: "cloudnative-pg-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the cnpg-system namespace",
  code: "ts",
} as const satisfies Module
