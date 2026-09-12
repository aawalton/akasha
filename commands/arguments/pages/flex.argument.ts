import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const flex = {
  id: "01a094e7-f273-7ddb-b25f-e1aeba1b19e8",
  type: "argument",
  slug: "flex",
  said: "--flex",
  takes: "`flex-` and a number, which is what keeps it out of every vocabulary",
  value: "text",
  placeholder: "flex-n",
} as const satisfies Argument
