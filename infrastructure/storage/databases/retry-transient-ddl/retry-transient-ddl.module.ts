import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const retryTransientDdl = {
  id: "01a07740-d031-7c4b-9fdc-e16681cb6f2a",
  pageTypeSlug: "module",
  type: "module",
  slug: "retry-transient-ddl",
  definition: "shell lines retrying a data definition statement that failed in passing",
  code: "ts",
} as const satisfies Module
