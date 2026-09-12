import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const attendees = {
  id: "01a094d8-04a3-761e-a6a8-e3f059a7be9b",
  type: "argument",
  slug: "attendees",
  said: "--attendees",
  takes: "who attends, parted by commas",
  value: "text",
  placeholder: "emails",
} as const satisfies Argument
