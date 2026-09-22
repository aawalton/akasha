import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesHistorySettings = {
  id: "01a06197-4c9a-753f-9265-31468ba1c486",
  type: "page-type/module",
  slug: "sales-history-settings",
  definition: "the settings panel this library adds to the add-on menu",
  code: "ts",
} as const satisfies Module
