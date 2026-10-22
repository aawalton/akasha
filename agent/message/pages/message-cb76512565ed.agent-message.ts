import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageCb76512565ed = {
  id: "01a16424-e3f9-7000-bf86-cb76512565ed",
  type: "page-type/agent-message",
  slug: "message-cb76512565ed",
  to: "seat/astra",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service has said no round of its work landed, ever. This was seen at 2026-10-22T15:05:01.321Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`.\n",
  createdAt: "2026-10-22T15:05:02.086Z",
  updatedAt: "2026-10-22T15:05:02.086Z",
} as const satisfies AgentMessage
