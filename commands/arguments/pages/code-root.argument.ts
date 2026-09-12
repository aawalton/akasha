import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const codeRoot = {
  id: "01a0949d-b8ba-70a4-b448-2813e660a314",
  type: "argument",
  slug: "code-root",
  said: "--code-root",
  takes: "the checkout the work is done against",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
