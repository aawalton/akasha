import type { Module } from "@akasha/code-system/module"

export const authProxyRbac = {
  id: "01a06860-955d-7003-ad1b-d777c5719098",
  pageTypeSlug: "module",
  slug: "auth-proxy-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the auth-proxy namespace",
  code: "ts",
} as const satisfies Module
