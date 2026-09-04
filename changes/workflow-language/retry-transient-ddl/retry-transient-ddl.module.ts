import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const retryTransientDdl = {
  id: "01a06f10-7000-700e-b000e-9d4a2f6c000ee1",
  pageTypeSlug: "module",
  slug: "retry-transient-ddl",
  definition: "shell lines retrying a data definition statement that failed in passing",
  code: "ts",
} as const satisfies Module
