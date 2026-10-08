import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const expectText = {
  id: "01a094ce-1b31-7d4c-a70a-abf794452c46",
  type: "page-type/argument",
  slug: "expect-text",
  said: "--expect-text",
  takes: "text the rendered body is to hold",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:48:50.481Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
