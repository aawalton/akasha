import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const healthTotalPoints = {
  id: "01a06972-b9ac-7000-9acd-7dec5960ac52",
  pageTypeSlug: "module",
  slug: "health-total-points",
  definition: "each health persona's cumulative total, summed from her days and landed on her page",
  code: "ts",
} as const satisfies Module
