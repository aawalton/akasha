import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotionId = string

export const notionId = {
  id: "01a06575-c2b8-7bd8-9e41-a9fc0d779b40",
  pageTypeSlug: "text-property",
  slug: "notion-id",
  propertySlug: "notion-id",
  definition: "the Notion page this statement was imported from",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
