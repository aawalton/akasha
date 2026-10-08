import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const mechanic = {
  id: "01a0c5ff-06a0-7988-b741-1409a445bc48",
  type: "page-type/argument",
  slug: "mechanic",
  said: "--mechanic",
  takes: "the mechanic the numbers come from",
  value: "text",
  placeholder: "address",
  createdAt: "2026-09-21T22:03:40.064Z",
  updatedAt: "2026-09-21T22:04:07.000Z",
} as const satisfies Argument
