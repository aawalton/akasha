import type { Module } from "@akasha/code-system/module"

export const certManagerRbac = {
  id: "01a06860-955d-7004-a130-738e889537d7",
  pageTypeSlug: "module",
  slug: "cert-manager-rbac",
  definition:
    "the cluster permissions the pipeline engine is granted in the cert-manager namespace",
  code: "ts",
} as const satisfies Module
