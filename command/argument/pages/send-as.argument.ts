import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sendAs = {
  id: "01a094ef-3f92-7f52-a054-194b031edc9d",
  type: "page-type/argument",
  slug: "send-as",
  said: "--from",
  takes: "a verified send-as alias to send the mail from",
  value: "text",
  placeholder: '"Name <addr>"',
  createdAt: "2026-09-12T09:25:02.482Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
