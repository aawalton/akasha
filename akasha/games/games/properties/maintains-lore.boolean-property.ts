import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type MaintainsLore = boolean

export const maintainsLore = {
  id: "01a0673c-8e0e-700b-a3ad-ec201e628a41",
  pageTypeSlug: "boolean-property",
  slug: "maintains-lore",
  propertySlug: "maintains-lore",
  definition: "whether a game keeps a record of what is true in its world",
} as const satisfies BooleanProperty
