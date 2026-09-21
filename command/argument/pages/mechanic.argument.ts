import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const mechanic = {
  id: "01a0c5ff-06a0-7988-b741-1409a445bc48",
  type: "page-type/argument",
  slug: "mechanic",
  said: "--mechanic",
  takes: "the mechanic the numbers come from",
  value: "text",
  placeholder: "address",
} as const satisfies Argument
