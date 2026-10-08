import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toInitiative = {
  id: "01a094d3-2ba3-728c-a3f2-2f70b7d47c35",
  type: "page-type/argument",
  slug: "to-initiative",
  said: "--to",
  takes: "the initiative taking the intent",
  value: "text",
  placeholder: "to",
  createdAt: "2026-09-12T08:54:22.371Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
