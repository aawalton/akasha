import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const attendees = {
  id: "01a094d8-04a3-761e-a6a8-e3f059a7be9b",
  type: "page-type/argument",
  slug: "attendees",
  said: "--attendees",
  takes: "who attends, parted by commas",
  value: "text",
  placeholder: "emails",
  createdAt: "2026-09-12T08:59:40.067Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
