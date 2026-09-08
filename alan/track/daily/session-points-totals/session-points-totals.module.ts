import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionPointsTotals = {
  id: "01a06972-b84f-7000-9c28-914ae9bf61cc",
  pageTypeSlug: "module",
  slug: "session-points-totals",
  definition:
    "the three session personas' points, totalled over all rows and landed a day at a time",
  code: "ts",
} as const satisfies Module
