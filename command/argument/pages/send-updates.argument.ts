import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sendUpdates = {
  id: "01a094cd-b8ce-74c1-9647-77c168cacdd7",
  type: "page-type/argument",
  slug: "send-updates",
  said: "--send-updates",
  takes: "who is emailed about the act, of `all`, `externalOnly` and `none`",
  value: "text",
  placeholder: "who",
  createdAt: "2026-09-12T08:48:25.294Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
