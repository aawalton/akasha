import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Seq = number

export const seq = {
  id: "01a05fd8-c30f-7952-a31b-5b37f793d59e",
  pageTypeSlug: "number-property",
  slug: "seq",
  propertySlug: "seq",
  definition: "the place a record takes in the order its file was written",
  max: null,
} as const satisfies NumberProperty
