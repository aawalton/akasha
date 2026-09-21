import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const tag = {
  id: "01a0c563-e7a0-7af2-bdf9-83fbfe3ac314",
  type: "page-type/argument",
  slug: "tag",
  said: "--tag",
  takes: "a word Alan files this under, said once for each tag",
  value: "text",
  placeholder: "tag",
} as const satisfies Argument
