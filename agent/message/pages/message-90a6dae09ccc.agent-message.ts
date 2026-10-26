import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message90a6dae09ccc = {
  id: "01a179c1-7c41-7000-a0a5-90a6dae09ccc",
  type: "page-type/agent-message",
  slug: "message-90a6dae09ccc",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service answered 382 requests in 5 s or more in the last ten minutes, and took 69 s over one answer in the last ten minutes, and held its listening thread 67 s in the last ten minutes. This was seen at 2026-10-26T19:48:05.463Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-10-26T19:48:06.213Z",
  updatedAt: "2026-10-26T19:48:06.213Z",
} as const satisfies AgentMessage
