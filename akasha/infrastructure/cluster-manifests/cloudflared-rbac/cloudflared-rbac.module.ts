import type { Module } from "@akasha/code-system/module"

export const cloudflaredRbac = {
  id: "01a06860-955d-7005-802f-1dd83e0b876b",
  pageTypeSlug: "module",
  slug: "cloudflared-rbac",
  definition: "the cluster permissions the pipeline engine is granted in the cloudflared namespace",
  code: "ts",
} as const satisfies Module
