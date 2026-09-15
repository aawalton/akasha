import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const errorsPath = {
  id: "01a094d0-c7f9-7d85-aa2f-80cb2cd54852",
  type: "page-type/argument",
  slug: "errors-path",
  said: "--errors-path",
  takes: "the saved-variables file the errors are read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
