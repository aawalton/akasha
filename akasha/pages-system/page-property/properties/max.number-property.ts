import type { NumberProperty } from "../number-property.page-type.ts"

export type Max = number

export const max = {
  id: "01a049b9-856c-7599-ab4a-e644848ad626",
  pageTypeSlug: "number-property",
  slug: "max",
  definition: "the most a value may run to, in characters or entries",
  max: null,
} as const satisfies NumberProperty
