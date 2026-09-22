import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryProcessingRequest = {
  id: "01a06197-4c98-7a42-ae31-e1e74832c6ad",
  type: "page-type/module",
  slug: "sales-history-processing-request",
  definition: "one batch of cached events worked through in the background",
  code: "ts",
} as const satisfies Module
