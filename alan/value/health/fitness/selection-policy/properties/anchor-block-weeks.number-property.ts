import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const anchorBlockWeeks = {
  id: "01a06865-7f45-774a-81f4-b19ea3ed1455",
  type: "page-type/number-property",
  slug: "anchor-block-weeks",
  propertySlug: "anchor-block-weeks",
  definition: "how many weeks an anchor movement has its place before it may change",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
