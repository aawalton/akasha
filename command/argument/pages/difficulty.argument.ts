import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const difficulty = {
  id: "01a094b0-2ded-74b5-acb9-d85f2c741061",
  type: "page-type/argument",
  slug: "difficulty",
  said: "--difficulty",
  takes: "how hard the stretch was on him, from 0 to 5 in half steps",
  value: "text",
  placeholder: "level",
  createdAt: "2026-09-12T08:16:09.197Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
