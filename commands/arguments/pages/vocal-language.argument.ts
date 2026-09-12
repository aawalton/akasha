import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const vocalLanguage = {
  id: "01a094d6-9f7a-746d-b3da-972ef9fc4fc3",
  type: "argument",
  slug: "vocal-language",
  said: "--vocal-language",
  takes: "the language the singing is in",
  value: "text",
  placeholder: "code",
} as const satisfies Argument
