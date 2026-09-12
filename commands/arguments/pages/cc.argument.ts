import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const cc = {
  id: "01a094ee-b9fa-77ae-ac4b-082bc0283471",
  type: "argument",
  slug: "cc",
  said: "--cc",
  takes: "who is copied, said again or parted by commas",
  value: "text",
  placeholder: "addr,..",
  repeats: true,
} as const satisfies Argument
