import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const stylesheetColor = {
  id: "01a0d58f-e044-7401-9ebe-ec348f69d852",
  type: "page-type/relation-property",
  slug: "stylesheet-color",
  propertySlug: "color",
  definition: "the color page whose hex a stylesheet writes to a custom property",
  targetPageType: "page-type/color",
  types: "ts",
} as const satisfies RelationProperty
