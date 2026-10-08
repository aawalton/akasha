import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seat = {
  id: "01a094c9-0b6b-742a-a293-ec014e355430",
  type: "page-type/argument",
  slug: "seat",
  said: "--seat",
  takes: "the seat acted on, named as that seat's page is named",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:43:18.763Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
