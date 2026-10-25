import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageCd223ae06807 = {
  id: "01a1749b-1e4f-7000-9d16-cd223ae06807",
  type: "page-type/agent-message",
  slug: "message-cd223ae06807",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service answered 31 requests in 5 s or more in the last ten minutes. This was seen at 2026-10-25T19:48:04.957Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-10-25T19:48:05.744Z",
  updatedAt: "2026-10-25T19:48:05.744Z",
} as const satisfies AgentMessage
