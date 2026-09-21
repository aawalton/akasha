import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const displayMode = {
  id: "01a06193-6ca0-7dfd-91bc-9bc2c64a4173",
  type: "page-type/text-property",
  slug: "display-mode",
  propertySlug: "display-mode",
  definition: "whether a value is said as a whole or as one tick",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
