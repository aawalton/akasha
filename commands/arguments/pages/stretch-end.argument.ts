import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const stretchEnd = {
  id: "01a094e4-8c76-7a61-a0c5-e11237059e74",
  type: "argument",
  slug: "stretch-end",
  said: "--end",
  takes: "the wall time the stretch ended",
  value: "text",
  placeholder: "time",
} as const satisfies Argument
