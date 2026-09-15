import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const turnState = {
  id: "01a094f5-de98-7770-b753-8c3a1f2d843e",
  type: "page-type/argument",
  slug: "turn-state",
  said: "--state",
  takes: "a turn state to answer for rather than an agent, said once per state",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
