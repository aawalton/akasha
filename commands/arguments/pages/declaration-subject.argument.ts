import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const declarationSubject = {
  id: "01a094f4-66b6-79a6-9bd8-613b62a8c8ad",
  type: "argument",
  slug: "declaration-subject",
  said: "--subject",
  takes: "`domains` or `personas` alone, where both would be said",
  value: "text",
  placeholder: "subject",
} as const satisfies Argument
