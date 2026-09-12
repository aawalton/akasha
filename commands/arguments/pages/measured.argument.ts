import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const measured = {
  id: "01a09500-ea1b-7533-8a00-621e47a42ae5",
  type: "argument",
  slug: "measured",
  said: "--measured",
  takes: "run the whole deploy under no ceiling, so what it cost is recorded",
  value: "none",
} as const satisfies Argument
