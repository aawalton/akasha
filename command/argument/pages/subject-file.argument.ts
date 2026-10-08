import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const subjectFile = {
  id: "01a094e3-4c26-7dc8-a762-277ee4dcc981",
  type: "page-type/argument",
  slug: "subject-file",
  said: "--subject-file",
  takes: "the file the subject is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:11:59.270Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
