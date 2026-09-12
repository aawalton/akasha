import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const stretchStart = {
  id: "01a094e4-0b33-7623-8b78-bc4fa4db5f37",
  type: "argument",
  slug: "stretch-start",
  said: "--start",
  takes: "the wall time the stretch began",
  value: "text",
  placeholder: "time",
} as const satisfies Argument
