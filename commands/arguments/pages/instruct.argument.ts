import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const instruct = {
  id: "01a094eb-2abc-7a6f-9ba0-75646b785e0d",
  type: "argument",
  slug: "instruct",
  said: "--instruct",
  takes: "the voice described in words",
  value: "text",
  placeholder: "description",
} as const satisfies Argument
