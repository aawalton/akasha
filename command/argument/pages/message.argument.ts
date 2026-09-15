import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const message = {
  id: "01a094be-8597-782a-966e-2b752ad8b925",
  type: "page-type/argument",
  slug: "message",
  said: "--message",
  takes: "the message acted on, said as the id Gmail gives it",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
