import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const check = {
  id: "01a094f2-cd5c-745d-a0cc-a1fb5019d829",
  type: "argument",
  slug: "check",
  said: "--check",
  takes: "a check the round runs beyond the ones the audit phase names",
  value: "text",
  placeholder: "slug",
  repeats: true,
} as const satisfies Argument
