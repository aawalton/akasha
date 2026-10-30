import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8495025a0c62 = {
  id: "01a18cd3-0db0-7066-a38e-8495025a0c62",
  type: "page-type/agent-message",
  slug: "message-8495025a0c62",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service answered 23 requests in 5 s or more in the last ten minutes, and held its listening thread 13 s in the last ten minutes. This was seen at 2026-10-30T12:40:03.953Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-10-30T12:40:05.847Z",
  updatedAt: "2026-10-30T12:40:05.847Z",
} as const satisfies AgentMessage
