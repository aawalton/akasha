import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const lang = {
  id: "01a094d8-0ffa-79d5-90ad-194605da93e0",
  type: "page-type/argument",
  slug: "lang",
  said: "--lang",
  takes: "the language the speaking is in",
  value: "text",
  placeholder: "name",
  default: "English",
} as const satisfies Argument
