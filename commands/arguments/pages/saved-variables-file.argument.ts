import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const savedVariablesFile = {
  id: "01a094d0-693a-7ef0-af92-ab257f8957a0",
  type: "argument",
  slug: "saved-variables-file",
  said: "--saved-variables-file",
  takes: "the file the catalog addon's collected data is read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
