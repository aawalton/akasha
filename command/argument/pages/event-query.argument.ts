import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const eventQuery = {
  id: "01a094eb-ca07-79de-985e-ff18335b13fe",
  type: "page-type/argument",
  slug: "event-query",
  said: "--query",
  takes: "the text an event is kept for",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T09:21:15.783Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
