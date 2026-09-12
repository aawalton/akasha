import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectCountSelector = {
  id: "01a094ce-4144-711b-8502-593996c1c134",
  type: "argument",
  slug: "expect-count-selector",
  said: "--expect-count-selector",
  takes: "the elements a count is taken over",
  value: "text",
  placeholder: "sel",
} as const satisfies Argument
