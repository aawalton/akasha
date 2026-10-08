import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const bonuses = {
  id: "01a0c5ff-5418-754d-b1d1-63bfac5e1099",
  type: "page-type/argument",
  slug: "bonuses",
  said: "--bonuses",
  takes: "what each named bonus adds, written as JSON",
  value: "text",
  placeholder: "json",
  createdAt: "2026-09-21T22:03:59.896Z",
  updatedAt: "2026-09-21T22:04:07.000Z",
} as const satisfies Argument
