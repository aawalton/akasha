import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const vocalLanguage = {
  id: "01a094d6-9f7a-746d-b3da-972ef9fc4fc3",
  type: "page-type/argument",
  slug: "vocal-language",
  said: "--vocal-language",
  takes: "the language the singing is in",
  value: "text",
  placeholder: "code",
  default: "en",
} as const satisfies Argument
