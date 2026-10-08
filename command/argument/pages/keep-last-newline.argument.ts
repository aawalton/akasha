import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const keepLastNewline = {
  id: "01a094e5-c2a3-76b4-b5a0-9ee39c13a5ba",
  type: "page-type/argument",
  slug: "keep-last-newline",
  said: "--keep-last-newline",
  takes: "the trailing newline, for a value that is a whole file ending in one",
  value: "none",
  createdAt: "2026-09-12T09:14:40.675Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
