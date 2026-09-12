import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const event = {
  id: "01a094bc-189e-7f6e-b003-a99753dcfbbc",
  type: "argument",
  slug: "event",
  said: "--event",
  takes: "the event acted on, said as the id its calendar gives it",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
