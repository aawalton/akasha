import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const priority = {
  id: "01a094d7-48fa-74f7-aae8-c83d88557ca0",
  type: "page-type/argument",
  slug: "priority",
  said: "--priority",
  takes: "which lane of the traffic cop the request waits in",
  value: "text",
  placeholder: "lane",
  default: "normal",
  createdAt: "2026-09-12T08:58:52.026Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
