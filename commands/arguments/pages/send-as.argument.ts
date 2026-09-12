import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const sendAs = {
  id: "01a094ef-3f92-7f52-a054-194b031edc9d",
  type: "argument",
  slug: "send-as",
  said: "--from",
  takes: "a verified send-as alias to send the mail from",
  value: "text",
  placeholder: '"Name <addr>"',
} as const satisfies Argument
