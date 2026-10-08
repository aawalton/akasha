import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fromFile = {
  id: "01a094e5-211d-7a7d-9282-aa4fff006a29",
  type: "page-type/argument",
  slug: "from-file",
  said: "--from-file",
  takes: "the file the day's lines are read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:13:59.325Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
