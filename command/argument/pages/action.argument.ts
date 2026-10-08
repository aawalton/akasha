import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const action = {
  id: "01a094b6-1d2f-79f9-9974-9cc7d80fc2df",
  type: "page-type/argument",
  slug: "action",
  said: "--action",
  takes: "what is done with an item the rule reaches",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:22:38.127Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
