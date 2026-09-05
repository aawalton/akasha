import type { Module } from "@akasha/code-system/module"

export const portReadiness = {
  id: "01a06815-9efd-7009-ba3a-17a676912aec",
  pageTypeSlug: "module",
  slug: "port-readiness",
  definition: "waiting until a port answers or until a port falls silent",
  code: "ts",
} as const satisfies Module
