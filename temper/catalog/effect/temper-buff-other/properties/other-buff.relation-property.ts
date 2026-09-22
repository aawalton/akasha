import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const otherBuff = {
  id: "01a0c9ff-72a4-7eca-9c6d-8183b871fe68",
  type: "page-type/relation-property",
  slug: "other-buff",
  propertySlug: "other-buff",
  definition: "a slug naming a helpful effect the game names neither Major nor Minor",
  targetPageType: "page-type/temper-buff-other",
  types: "ts",
} as const satisfies RelationProperty
