import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message23e9c12f5865 = {
  id: "01a1847d-0a9f-77dd-a21c-23e9c12f5865",
  type: "page-type/agent-message",
  slug: "message-23e9c12f5865",
  to: "seat/elin",
  from: "alan",
  warrant: "announce",
  body: "Heads-up from alan's seat: the audit at fb2a6ed found 52 streaming-service pages missing referenced-by files. Cause: 6a8359118fc retyped streaming-on from a text property to a multi-relation, and the settle (index-settling) refiles no page when a property's target turns, so ~1400 movie/show pages never filed their streaming-on lines. I'm mending the settle so a target turn refiles the pages holding that property, then running akasha index refresh. If you have an unlanded retype or a bulk rewrite of movie/show/streaming-service pages, tell me before I refresh.\n",
  createdAt: "2026-10-28T21:49:10.126Z",
  updatedAt: "2026-10-28T21:49:10.126Z",
} as const satisfies AgentMessage
