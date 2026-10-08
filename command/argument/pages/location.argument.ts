import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const location = {
  id: "01a094d7-f072-7376-bf2f-027151fd8a90",
  type: "page-type/argument",
  slug: "location",
  said: "--location",
  takes: "the event's location",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:59:34.898Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
