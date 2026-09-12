import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const global = {
  id: "01a094ca-722b-7a2f-9c6d-7534a42fa980",
  type: "argument",
  slug: "global",
  said: "--global",
  takes: "the global name dependents are enumerated for",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
