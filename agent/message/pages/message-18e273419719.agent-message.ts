import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message18e273419719 = {
  id: "01a14c00-3240-7000-b602-18e273419719",
  type: "page-type/agent-message",
  slug: "message-18e273419719",
  to: "seat/ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running, and has been since 2026-10-17T22:31:31.000Z. This was seen at 2026-10-17T22:34:03.332Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
  createdAt: "2026-10-17T22:34:04.173Z",
  updatedAt: "2026-10-17T22:34:04.173Z",
} as const satisfies AgentMessage
