import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const priority = {
  id: "01a094d7-48fa-74f7-aae8-c83d88557ca0",
  type: "argument",
  slug: "priority",
  said: "--priority",
  takes: "which lane of the traffic cop the request waits in",
  value: "text",
  placeholder: "lane",
} as const satisfies Argument
