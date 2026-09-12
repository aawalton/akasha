import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const mailQuery = {
  id: "01a094e6-0fe8-7557-972f-ff9be8c04582",
  type: "argument",
  slug: "mail-query",
  said: "--query",
  takes: "Gmail search syntax a listing is matched against",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
