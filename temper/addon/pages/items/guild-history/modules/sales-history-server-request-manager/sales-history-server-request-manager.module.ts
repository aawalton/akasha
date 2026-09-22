import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryServerRequestManager = {
  id: "01a06197-4c9a-7dc6-b864-a6bb213acebc",
  type: "page-type/module",
  slug: "sales-history-server-request-manager",
  definition: "the queue deciding which server request goes next",
  code: "ts",
} as const satisfies Module
