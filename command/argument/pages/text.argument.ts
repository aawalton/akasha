import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const text = {
  id: "01a094ec-dc4e-76d2-a14b-9bde5cd89a81",
  type: "page-type/argument",
  slug: "text",
  said: "--text",
  takes: "the message body",
  value: "text",
  placeholder: "body",
} as const satisfies Argument
