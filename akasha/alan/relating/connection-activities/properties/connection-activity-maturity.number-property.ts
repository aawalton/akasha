import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ConnectionActivityMaturity = number

export const connectionActivityMaturity = {
  id: "01a0658e-c30e-7322-a90e-abd7f83ef497",
  pageTypeSlug: "number-property",
  slug: "connection-activity-maturity",
  propertySlug: "connection-activity-maturity",
  definition: "how grown-up the other person is",
  max: null,
} as const satisfies NumberProperty
