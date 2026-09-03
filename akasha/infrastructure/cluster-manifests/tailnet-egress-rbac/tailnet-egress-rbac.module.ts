import type { Module } from "@akasha/code-system/module"

export const tailnetEgressRbac = {
  id: "01a06860-955d-7017-b370-a4a15b03918f",
  pageTypeSlug: "module",
  slug: "tailnet-egress-rbac",
  definition:
    "the cluster permissions the pipeline engine is granted in the tailnet-egress namespace",
  code: "ts",
} as const satisfies Module
