import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAgentIdleness = {
  id: "01a09c74-522d-7dde-b3a8-be37b2fa1151",
  type: "page-type/domain",
  slug: "seat-agent-idleness",
  definition: "whether the agent in a seat is doing nothing",
  parts: ["module/supervisor-idle-decide", "module/supervisor-idle-observe"],
} as const satisfies Domain
