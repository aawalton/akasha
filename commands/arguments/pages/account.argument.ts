import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const account = {
  id: "01a094e9-14d6-78a3-a639-4fec8033b086",
  type: "argument",
  slug: "account",
  said: "--account",
  takes: "the name a claude account is reached by",
  value: "text",
  placeholder: "account",
} as const satisfies Argument
