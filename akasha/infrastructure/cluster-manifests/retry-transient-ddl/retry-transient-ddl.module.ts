import type { Module } from "@akasha/code-system/module"

export const retryTransientDdl = {
  id: "01a06810-1262-7ce1-923f-16c3e36fefd1",
  pageTypeSlug: "module",
  slug: "retry-transient-ddl",
  definition: "the retry loop a schema statement racing the catalog is wrapped in",
  code: "ts",
} as const satisfies Module
