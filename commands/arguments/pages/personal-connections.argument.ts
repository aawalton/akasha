import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const personalConnections = {
  id: "01a094ef-b8b9-7ad4-8d0a-e32ccbed3722",
  type: "argument",
  slug: "personal-connections",
  said: "--personal-connections",
  takes: "what a song is tied to in Alan's own life",
  value: "text",
  placeholder: "md",
} as const satisfies Argument
