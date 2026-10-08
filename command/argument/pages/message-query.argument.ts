import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const messageQuery = {
  id: "01a094e4-ed10-7e2d-a4ea-25d7563eaa55",
  type: "page-type/argument",
  slug: "message-query",
  said: "--query",
  takes: "the run of characters a message's text must hold",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T09:13:46.000Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
