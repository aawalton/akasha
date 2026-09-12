import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const contactQuery = {
  id: "01a094dd-eccd-7a20-a9ca-ffc23515daa4",
  type: "argument",
  slug: "contact-query",
  said: "--query",
  takes: "the run of letters a contact's name must hold",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
