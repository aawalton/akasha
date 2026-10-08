import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const event = {
  id: "01a094bc-189e-7f6e-b003-a99753dcfbbc",
  type: "page-type/argument",
  slug: "event",
  said: "--event",
  takes: "the event acted on, said as the id its calendar gives it",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T08:29:10.174Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
