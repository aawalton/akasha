import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const summary = {
  id: "01a094d7-9f86-7db8-8562-a2847b750e91",
  type: "page-type/argument",
  slug: "summary",
  said: "--summary",
  takes: "the event's title",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:59:14.182Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
