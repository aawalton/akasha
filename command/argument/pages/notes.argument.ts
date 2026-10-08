import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const notes = {
  id: "01a094b1-ddaa-74d6-99db-1b3de6167fde",
  type: "page-type/argument",
  slug: "notes",
  said: "--notes",
  takes: "a note the web shows",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:17:59.722Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
