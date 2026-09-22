import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const notionId = {
  id: "01a0658a-739f-7f80-8848-4928e67a325c",
  type: "page-type/text-property",
  slug: "notion-id",
  propertySlug: "notion-id",
  definition: "this statement's Notion page",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
