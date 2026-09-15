import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seat = {
  id: "01a094c9-0b6b-742a-a293-ec014e355430",
  type: "page-type/argument",
  slug: "seat",
  said: "--seat",
  takes: "the seat acted on, named as that seat's page is named",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
