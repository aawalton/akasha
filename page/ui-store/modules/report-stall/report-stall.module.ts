import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reportStall = {
  id: "01a05b69-4559-70af-a7b9-baa8532cd964",
  type: "page-type/module",
  slug: "report-stall",
  definition: "the note given off when the page store has stalled",
  code: "ts",
} as const satisfies Module
