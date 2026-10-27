import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message679b54f59780 = {
  id: "01a17efa-1896-72bb-8e10-679b54f59780",
  type: "page-type/agent-message",
  slug: "message-679b54f59780",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service answered 16 requests in 5 s or more in the last ten minutes. This was seen at 2026-10-27T20:08:01.502Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-10-27T20:08:02.512Z",
  updatedAt: "2026-10-27T20:08:02.512Z",
} as const satisfies AgentMessage
