import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const addon = {
  id: "01a094a5-1fd8-797a-b9ad-46cfe9ce8357",
  type: "page-type/argument",
  slug: "addon",
  said: "--addon",
  takes: "the addon acted on, as the roster names it",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:04:04.696Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
