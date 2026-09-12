import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toNumber = {
  id: "01a09513-aee6-7dd2-bd9b-defd127a789c",
  type: "argument",
  slug: "to-number",
  said: "--to",
  takes: "the number the text goes to, written in E.164",
  value: "text",
  placeholder: "e164",
} as const satisfies Argument
