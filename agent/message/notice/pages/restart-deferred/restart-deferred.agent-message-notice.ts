import type { AgentMessageNotice } from "akasha/agent/message/notice/agent-message-notice.page-type.types.ts"

export const restartDeferred = {
  id: "01a06864-7aa3-7f1d-8d0e-7e8835e11fd1",
  type: "page-type/agent-message-notice",
  slug: "restart-deferred",
  text: "md",
  warrant:
    "Rides the seat's next real inbound rather than a restart, so hours may have passed before it is read. It goes to a seat that was idle, so it must not tell that seat to pick up what it had in hand.",
  createdAt: "2026-09-03T17:50:10.595Z",
  updatedAt: "2026-09-22T17:37:14.000Z",
} as const satisfies AgentMessageNotice
