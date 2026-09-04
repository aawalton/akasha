import type { Module } from "@akasha/code-system/module"

export const metallbRbac = {
  id: "01a06860-955d-700d-b1e7-7f2a05a1a1b9",
  pageTypeSlug: "module",
  slug: "metallb-rbac",
  definition:
    "the cluster permissions the pipeline engine is granted in the metallb-system namespace",
  code: "ts",
} as const satisfies Module
