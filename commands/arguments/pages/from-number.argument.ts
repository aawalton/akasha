import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const fromNumber = {
  id: "01a094ec-efaf-7edc-a626-5120e802c93b",
  type: "argument",
  slug: "from-number",
  said: "--from",
  takes: "the number to send from, written in E.164",
  value: "text",
  placeholder: "e164",
} as const satisfies Argument
