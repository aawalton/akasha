import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const json = {
  id: "01a0946f-ef85-7227-9a41-5893593f049e",
  type: "page-type/argument",
  slug: "json",
  said: "--json",
  takes: "answer as JSON rather than as the lines a reader takes",
  value: "none",
  createdAt: "2026-09-12T07:05:58.917Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
