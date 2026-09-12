import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const charactersPath = {
  id: "01a094b5-2848-74a3-8049-e0e3f4b0739e",
  type: "argument",
  slug: "characters-path",
  said: "--characters-path",
  takes: "the saved-variables file the characters are read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
