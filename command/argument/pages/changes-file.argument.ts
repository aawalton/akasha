import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const changesFile = {
  id: "01a10256-8b7b-78ad-8404-e8b0e5c59771",
  type: "page-type/argument",
  slug: "changes-file",
  said: "--changes-file",
  takes: "the file the mechanics recorder's changes are read from, one json change to a line",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
