import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const refTextFile = {
  id: "01a094dc-696e-727f-8957-95e69fcf72da",
  type: "page-type/argument",
  slug: "ref-text-file",
  said: "--ref-text-file",
  takes: "the file the reference clip's transcript is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:04:28.014Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
