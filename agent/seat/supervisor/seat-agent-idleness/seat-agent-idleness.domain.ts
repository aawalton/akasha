import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAgentIdleness = {
  id: "01a09c74-522d-7dde-b3a8-be37b2fa1151",
  type: "page-type/domain",
  slug: "seat-agent-idleness",
  definition: "a seat's agent with no work",
  parts: ["module/supervisor-idle-decide", "module/supervisor-idle-observe"],
  createdAt: "2026-09-13T20:27:44.045Z",
  updatedAt: "2026-09-24T17:03:24.000Z",
} as const satisfies Domain
