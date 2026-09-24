import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const lastMessagedAt = {
  id: "01a05398-caad-7428-b9a6-ec3a8f09470c",
  type: "page-type/instant-property",
  slug: "last-messaged-at",
  propertySlug: "last-messaged-at",
  definition: "when Alan last wrote to a persona",

  types: "ts",
} as const satisfies InstantProperty
