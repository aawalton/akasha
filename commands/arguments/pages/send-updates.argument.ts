import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const sendUpdates = {
  id: "01a094cd-b8ce-74c1-9647-77c168cacdd7",
  type: "argument",
  slug: "send-updates",
  said: "--send-updates",
  takes: "who is emailed about the act, of `all`, `externalOnly` and `none`",
  value: "text",
  placeholder: "who",
} as const satisfies Argument
