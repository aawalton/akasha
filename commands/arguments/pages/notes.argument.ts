import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const notes = {
  id: "01a094b1-ddaa-74d6-99db-1b3de6167fde",
  type: "argument",
  slug: "notes",
  said: "--notes",
  takes: "a note the web shows",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
