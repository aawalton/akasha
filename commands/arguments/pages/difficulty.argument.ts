import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const difficulty = {
  id: "01a094b0-2ded-74b5-acb9-d85f2c741061",
  type: "argument",
  slug: "difficulty",
  said: "--difficulty",
  takes: "how hard the stretch was on him, from 0 to 5 in half steps",
  value: "text",
  placeholder: "level",
} as const satisfies Argument
