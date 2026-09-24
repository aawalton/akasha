import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const bondGrows = {
  id: "01a0c63c-43c6-7716-87f0-3e3014e56855",
  type: "page-type/boolean-property",
  slug: "bond-grows",
  propertySlug: "grows",
  definition: "whether a bond strengthens as the two it holds are played",
  types: "ts",
} as const satisfies BooleanProperty
