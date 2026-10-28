import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF64ba556d422 = {
  id: "01a1846a-a0ee-7769-985a-f64ba556d422",
  type: "page-type/agent-message",
  slug: "message-f64ba556d422",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service answered 19 requests in 5 s or more in the last ten minutes. This was seen at 2026-10-28T21:29:02.483Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-10-28T21:29:03.513Z",
  updatedAt: "2026-10-28T21:29:03.513Z",
} as const satisfies AgentMessage
