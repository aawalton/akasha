import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const writeDailyPoints = {
  id: "01a06972-ba1c-7000-a663-259b73593e24",
  pageTypeSlug: "module",
  slug: "write-daily-points",
  definition: "one recomputed reading, landed on the day it is a reading of",
  code: "ts",
} as const satisfies Module
