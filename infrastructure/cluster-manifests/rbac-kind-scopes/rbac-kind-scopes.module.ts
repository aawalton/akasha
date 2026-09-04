import type { Module } from "@akasha/code-system/module"

export const rbacKindScopes = {
  id: "01a06860-955d-7020-b4b0-2f44572ca5c9",
  pageTypeSlug: "module",
  slug: "rbac-kind-scopes",
  definition:
    "whether a Kubernetes kind stands in a namespace or across the cluster, and the resource it is granted as",
  code: "ts",
} as const satisfies Module
