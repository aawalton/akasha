import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const keepLastNewline = {
  id: "01a094e5-c2a3-76b4-b5a0-9ee39c13a5ba",
  type: "page-type/argument",
  slug: "keep-last-newline",
  said: "--keep-last-newline",
  takes: "the trailing newline, for a value that is a whole file ending in one",
  value: "none",
} as const satisfies Argument
