import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const tag = {
  id: "01a0c563-e7a0-7af2-bdf9-83fbfe3ac314",
  type: "page-type/argument",
  slug: "tag",
  said: "--tag",
  takes: "a word Alan files this under, said once for each tag",
  value: "text",
  placeholder: "tag",
  createdAt: "2026-09-21T19:14:14.048Z",
  updatedAt: "2026-09-21T19:15:22.000Z",
} as const satisfies Argument
