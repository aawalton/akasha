import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const expectTitle = {
  id: "01a094ce-2e6f-742d-a469-87d5474328a8",
  type: "page-type/argument",
  slug: "expect-title",
  said: "--expect-title",
  takes: "the title the document is to carry",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:48:55.407Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
