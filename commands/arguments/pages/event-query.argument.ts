import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const eventQuery = {
  id: "01a094eb-ca07-79de-985e-ff18335b13fe",
  type: "argument",
  slug: "event-query",
  said: "--query",
  takes: "the text an event is kept for",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
