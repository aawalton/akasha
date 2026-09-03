import type { FormulaProperty } from "@akasha/pages-system/formula-property"

export type Stoplights = text

export const stoplights = {
  id: "01a06945-72cd-700f-bc15-83127595be6f",
  pageTypeSlug: "formula-property",
  slug: "stoplights",
  propertySlug: "stoplights",
  definition: "the rung each of the day's six values reached, as one colored light apiece",
  formula:
    '"{faith-stoplight}{love-stoplight}{health-stoplight}{learn-stoplight}{fun-stoplight}{weal' +
    'th-stoplight}"',
} as const satisfies FormulaProperty
