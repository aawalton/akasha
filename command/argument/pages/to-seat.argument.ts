import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toSeat = {
  id: "01a0d480-f76b-7719-ba41-f5b59b9a9888",
  type: "page-type/argument",
  slug: "to-seat",
  said: "--to",
  takes: "the seat the message goes to, named as that seat's page is named",
  value: "text",
  placeholder: "seat",
} as const satisfies Argument
