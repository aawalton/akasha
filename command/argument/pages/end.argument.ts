import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const end = {
  id: "01a094d7-c99b-7f27-87c9-d0e4e8057ccc",
  type: "page-type/argument",
  slug: "end",
  said: "--end",
  takes: "when the event closes, as a timestamp or as a date alone",
  value: "text",
  placeholder: "iso",
  createdAt: "2026-09-12T08:59:24.955Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
