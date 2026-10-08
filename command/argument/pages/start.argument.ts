import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const start = {
  id: "01a094d7-b51e-7b69-8f12-12780bb549db",
  type: "page-type/argument",
  slug: "start",
  said: "--start",
  takes: "when the event opens, as a timestamp or as a date alone",
  value: "text",
  placeholder: "iso",
  createdAt: "2026-09-12T08:59:19.710Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
