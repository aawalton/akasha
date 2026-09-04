import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AnchorBlockWeeks = number

export const anchorBlockWeeks = {
  id: "01a06865-7f45-774a-81f4-b19ea3ed1455",
  pageTypeSlug: "number-property",
  slug: "anchor-block-weeks",
  propertySlug: "anchor-block-weeks",
  definition: "how many weeks an anchor movement holds its place before it may change",
  max: null,
} as const satisfies NumberProperty
