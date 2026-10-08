import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conversationText = {
  id: "01a0d44b-fad9-7fc4-94c7-94b2a02cef41",
  type: "page-type/text-property",
  slug: "conversation-text",
  propertySlug: "text",
  definition: "the words that someone writes in a seat",
  maxLength: 1_000_000,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-24T16:42:24.345Z",
  updatedAt: "2026-09-25T18:05:28.000Z",
} as const satisfies TextProperty
