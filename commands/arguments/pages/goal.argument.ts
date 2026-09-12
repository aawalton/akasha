import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const goal = {
  id: "01a094b2-f3fb-7053-addd-f1ad476584d3",
  type: "argument",
  slug: "goal",
  said: "--goal",
  takes: "a goal label the web shows",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
