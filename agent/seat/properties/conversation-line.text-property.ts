import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conversationLine = {
  id: "01a0d44c-0104-7863-b1e1-d4af15ac725f",
  type: "page-type/text-property",
  slug: "conversation-line",
  propertySlug: "line",
  definition: "the short text shown for a stop or a program an agent calls",
  maxLength: 300,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
