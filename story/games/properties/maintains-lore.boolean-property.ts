import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const maintainsLore = {
  id: "01a0673c-8e0e-700b-a3ad-ec201e628a41",
  type: "boolean-property",
  slug: "maintains-lore",
  propertySlug: "maintains-lore",
  definition: "whether a game keeps a record of what is true in its world",
  types: "ts",
} as const satisfies BooleanProperty
