import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const status = {
  id: "01a094db-478a-771e-af44-9edcd2777680",
  type: "argument",
  slug: "status",
  said: "--status",
  takes: "the response to set, of `accepted`, `declined` and `tentative`",
  value: "text",
  placeholder: "status",
} as const satisfies Argument
