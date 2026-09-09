import type { NumberProperty } from "@akasha/pages/number-property"

export type AnchorBlockWeeks = number

export const anchorBlockWeeks = {
  id: "01a06865-7f45-774a-81f4-b19ea3ed1455",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "anchor-block-weeks",
  propertySlug: "anchor-block-weeks",
  definition: "how many weeks an anchor movement has its place before it may change",
  max: null,
} as const satisfies NumberProperty
