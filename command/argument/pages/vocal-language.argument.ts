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
  createdAt: "2026-09-12T08:58:08.634Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
