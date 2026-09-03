import type { TextProperty } from "@akasha/pages-system/text-property"

export type NotionId = string

export const notionId = {
  id: "01a06589-d12a-7079-a832-4577b7a16319",
  pageTypeSlug: "text-property",
  slug: "notion-id",
  propertySlug: "notion-id",
  definition: "the Notion page this statement was imported from",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
