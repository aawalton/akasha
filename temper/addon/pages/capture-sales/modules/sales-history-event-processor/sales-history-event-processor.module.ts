import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistoryEventProcessor = {
  id: "01a06197-4c93-7dea-a044-f963d916fcf6",
  type: "page-type/module",
  slug: "sales-history-event-processor",
  definition: "the processor an add-on asks for and the events that processor is handed",
  code: "ts",
} as const satisfies Module
