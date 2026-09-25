import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conversationSender = {
  id: "01a0d491-7b22-7920-bfb0-d58b44a473ed",
  type: "page-type/text-property",
  slug: "conversation-sender",
  propertySlug: "sender",
  definition: "the name of someone that sends a message to a seat",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
