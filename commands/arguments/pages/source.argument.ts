import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const source = {
  id: "01a094bc-3867-7b07-95f7-dc34cb18277f",
  type: "argument",
  slug: "source",
  said: "--source",
  takes: "where the item is bought from",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
