import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const title = {
  id: "01a094b0-c2a4-71d7-ae22-2df174cac987",
  type: "page-type/argument",
  slug: "title",
  said: "--title",
  takes: "a title a person reads",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:16:47.268Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
