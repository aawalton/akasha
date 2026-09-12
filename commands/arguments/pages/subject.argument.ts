import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const subject = {
  id: "01a094ee-e072-7374-bdb6-8402911d235b",
  type: "argument",
  slug: "subject",
  said: "--subject",
  takes: "the subject line",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
