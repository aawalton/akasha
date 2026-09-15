import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const notice = {
  id: "01a09b59-4847-7865-816e-48971ee4864a",
  type: "page-type/argument",
  slug: "notice",
  said: "--notice",
  takes: "the notice a seat takes up as its first turn, by that notice's slug",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
