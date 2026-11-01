import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7d309c410598 = {
  id: "01a197e0-ea19-70eb-ac4b-7d309c410598",
  type: "page-type/agent-message",
  slug: "message-7d309c410598",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service answered 11 requests in 5 s or more in the last ten minutes. This was seen at 2026-11-01T16:11:01.704Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-11-01T16:11:02.454Z",
  updatedAt: "2026-11-01T16:11:02.454Z",
} as const satisfies AgentMessage
