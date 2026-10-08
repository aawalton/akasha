import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const textFile = {
  id: "01a094db-c07f-7337-86cb-f9ccfc7b5830",
  type: "page-type/argument",
  slug: "text-file",
  said: "--text-file",
  takes: "the file the text is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:03:44.767Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
