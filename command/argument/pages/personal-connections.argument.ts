import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const personalConnections = {
  id: "01a094ef-b8b9-7ad4-8d0a-e32ccbed3722",
  type: "page-type/argument",
  slug: "personal-connections",
  said: "--personal-connections",
  takes: "what a song is tied to in Alan's own life",
  value: "text",
  placeholder: "md",
  createdAt: "2026-09-12T09:25:33.497Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
