import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const uri = {
  id: "01a094c1-0a79-73c5-896c-20b74bcce59f",
  type: "page-type/argument",
  slug: "uri",
  said: "--uri",
  takes: "the exact track played, which searches for nothing",
  value: "text",
  placeholder: "uri",
  createdAt: "2026-09-12T08:34:34.233Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
