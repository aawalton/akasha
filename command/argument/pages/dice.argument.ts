import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const dice = {
  id: "01a0c5ff-3ef1-73c8-93ad-1b572fc1532c",
  type: "page-type/argument",
  slug: "dice",
  said: "--dice",
  takes: "the handful of dice this run is rolled from",
  value: "text",
  placeholder: "handful",
} as const satisfies Argument
