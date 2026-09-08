import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const healthTotalPopulation = {
  id: "01a06972-b92c-7000-b4d6-568db04f3cfc",
  pageTypeSlug: "module",
  slug: "health-total-population",
  definition: "which personas a health total is summed over, and which of them a caller asked for",
  code: "ts",
} as const satisfies Module
