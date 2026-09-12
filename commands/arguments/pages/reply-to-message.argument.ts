import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const replyToMessage = {
  id: "01a094ef-2ca9-7d57-b2c1-fedc976540ae",
  type: "argument",
  slug: "reply-to-message",
  said: "--reply-to-message",
  takes: "the message whose id seeds In-Reply-To and References",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
