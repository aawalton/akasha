import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const agent = {
  id: "01a094f5-c832-789d-9e18-69e559a0a33f",
  type: "argument",
  slug: "agent",
  said: "--agent",
  takes: "an agent to answer for, said once per agent",
  value: "text",
  placeholder: "agent-id",
} as const satisfies Argument
