import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type HealthStoplight = text

export const healthStoplight = {
  id: "01a06945-72cd-700b-b644-c33ae8356e7f",
  pageTypeSlug: "formula-property",
  slug: "health-stoplight",
  propertySlug: "health-stoplight",
  definition: "the rung the day's health reached, as one colored light",
  formula:
    'case({health-level} == 4 -> "🔵", {health-level} == 3 -> "🟢", {health-level} == 2 -> ' +
    '"🟡", {health-level} == 1 -> "🔴", otherwise -> "⚫")',
} as const satisfies FormulaProperty
