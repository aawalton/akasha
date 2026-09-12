import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const agentId = {
  id: "01a094fc-559e-76c1-b3a4-f89010f6b094",
  type: "argument",
  slug: "agent-id",
  said: "--agent-id",
  takes: "the agent id the gateway runs under, which no seat may answer to",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
