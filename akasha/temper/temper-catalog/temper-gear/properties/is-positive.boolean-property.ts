import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsPositive = boolean

export const isPositive = {
  id: "01a05fd1-d43c-78a4-ae87-1501c6ab4f40",
  pageTypeSlug: "boolean-property",
  slug: "is-positive",
  propertySlug: "is-positive",
  definition: "whether an alchemy effect helps whoever drinks it",
} as const satisfies BooleanProperty
