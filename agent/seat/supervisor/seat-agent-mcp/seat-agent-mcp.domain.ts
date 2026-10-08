import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAgentMcp = {
  id: "01a09c6d-1a8a-71ca-a5ab-1b64efadb14f",
  type: "page-type/domain",
  slug: "seat-agent-mcp",
  definition: "the mcp servers started for a seat's agent",
  parts: [
    "module/browser-reaping",
    "module/mcp-disable-reconcile",
    "module/mcp-registry",
    "module/supervisor-mcp",
  ],
  createdAt: "2026-09-13T20:19:51.050Z",
  updatedAt: "2026-09-24T17:19:24.000Z",
} as const satisfies Domain
