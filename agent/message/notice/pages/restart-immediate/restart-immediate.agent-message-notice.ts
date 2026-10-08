import type { AgentMessageNotice } from "akasha/agent/message/notice/agent-message-notice.page-type.types.ts"

export const restartImmediate = {
  id: "01a06864-7aa3-7734-beb8-d01398581469",
  type: "page-type/agent-message-notice",
  slug: "restart-immediate",
  text: "md",
  warrant:
    "The restart notice a seat is respawned with, read the moment it comes back. It is one of the two the restart branch picks between.",
  createdAt: "2026-09-03T17:50:10.595Z",
  updatedAt: "2026-09-22T17:37:14.000Z",
} as const satisfies AgentMessageNotice
