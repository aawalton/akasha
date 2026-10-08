import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const agent = {
  id: "01a094f5-c832-789d-9e18-69e559a0a33f",
  type: "page-type/argument",
  slug: "agent",
  said: "--agent",
  takes: "an agent to answer for, said once per agent",
  value: "text",
  placeholder: "agent-id",
  createdAt: "2026-09-12T09:32:10.674Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
