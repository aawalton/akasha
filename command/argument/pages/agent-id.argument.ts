import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const agentId = {
  id: "01a094fc-559e-76c1-b3a4-f89010f6b094",
  type: "page-type/argument",
  slug: "agent-id",
  said: "--agent-id",
  takes: "the agent id the gateway runs under, which no seat may answer to",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T09:39:20.094Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
