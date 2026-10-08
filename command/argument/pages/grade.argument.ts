import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const grade = {
  id: "01a094db-fb21-793e-8145-27473c5a789e",
  type: "page-type/argument",
  slug: "grade",
  said: "--grade",
  takes: "the grade, a rung on the ladder from `F` up to `S+`",
  value: "text",
  placeholder: "F..S+",
  createdAt: "2026-09-12T09:03:59.777Z",
  updatedAt: "2026-09-21T18:21:30.000Z",
} as const satisfies Argument
