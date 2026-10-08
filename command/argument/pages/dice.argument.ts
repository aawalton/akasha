import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const dice = {
  id: "01a0c5ff-3ef1-73c8-93ad-1b572fc1532c",
  type: "page-type/argument",
  slug: "dice",
  said: "--dice",
  takes: "the handful of dice this run is rolled from",
  value: "text",
  placeholder: "handful",
  createdAt: "2026-09-21T22:03:54.481Z",
  updatedAt: "2026-09-21T22:04:07.000Z",
} as const satisfies Argument
