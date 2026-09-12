import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toAddress = {
  id: "01a09513-aee1-7e3a-8a9e-c4bb6d3526ac",
  type: "argument",
  slug: "to-address",
  said: "--to",
  takes: "who the mail goes to, said again or parted by commas",
  value: "text",
  placeholder: "addr,..",
} as const satisfies Argument
