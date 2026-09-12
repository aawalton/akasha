import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const id = {
  id: "01a094de-daf7-793c-af98-8cd44a8bdb67",
  type: "argument",
  slug: "id",
  said: "--id",
  takes: "the stretch to act on, named by the id that stretch carries",
  value: "text",
  placeholder: "uuid",
} as const satisfies Argument
