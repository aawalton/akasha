import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const goal = {
  id: "01a094b2-f3fb-7053-addd-f1ad476584d3",
  type: "page-type/argument",
  slug: "goal",
  said: "--goal",
  takes: "a goal label the web shows",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T08:19:10.971Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
