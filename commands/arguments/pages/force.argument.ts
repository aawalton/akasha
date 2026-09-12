import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const force = {
  id: "01a094a7-cd7d-7f4e-a42f-d49cc0c00c5b",
  type: "argument",
  slug: "force",
  said: "--force",
  takes: "go on past what would otherwise hold the act back",
  value: "none",
} as const satisfies Argument
