import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotionId = string

export const notionId = {
  id: "01a0658a-739f-7f80-8848-4928e67a325c",
  pageTypeSlug: "text-property",
  slug: "notion-id",
  propertySlug: "notion-id",
  definition: "the Notion page this statement was imported from",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
