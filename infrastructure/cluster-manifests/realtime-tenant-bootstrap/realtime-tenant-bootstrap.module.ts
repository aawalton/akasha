import type { Module } from "@akasha/code-system/module"

export const realtimeTenantBootstrap = {
  id: "01a06810-1263-7800-b5a2-4114193d0b72",
  pageTypeSlug: "module",
  slug: "realtime-tenant-bootstrap",
  definition: "the call that tells the subscription server which database it serves",
  code: "ts",
} as const satisfies Module
