import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const typedText = {
  id: "01a094c4-f465-77b6-bc25-489201f3cbc0",
  type: "argument",
  slug: "typed-text",
  said: "--text",
  takes: "the text typed, `-` reading it from what is piped in",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
