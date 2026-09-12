import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const size = {
  id: "01a094b8-ec4d-7422-a38e-351bb5a46bbe",
  type: "argument",
  slug: "size",
  said: "--size",
  takes: "the size the render is fixed to",
  value: "text",
  placeholder: "size",
} as const satisfies Argument
