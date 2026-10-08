import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const stylesheetColor = {
  id: "01a0d58f-e044-7401-9ebe-ec348f69d852",
  type: "page-type/relation-property",
  slug: "stylesheet-color",
  propertySlug: "color",
  definition: "the color page whose hex a stylesheet writes to a custom property",
  targetPageType: "page-type/color",
  types: "ts",
  createdAt: "2026-09-24T22:36:11.204Z",
  updatedAt: "2026-09-24T22:36:34.000Z",
} as const satisfies RelationProperty
