import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const status = {
  id: "01a094db-478a-771e-af44-9edcd2777680",
  type: "page-type/argument",
  slug: "status",
  said: "--status",
  takes: "the response to set, of `accepted`, `declined` and `tentative`",
  value: "text",
  placeholder: "status",
  createdAt: "2026-09-12T09:03:13.802Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
