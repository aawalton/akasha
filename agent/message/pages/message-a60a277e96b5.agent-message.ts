import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA60a277e96b5 = {
  id: "01a0d376-8cbf-7000-8294-a60a277e96b5",
  type: "page-type/agent-message",
  slug: "message-a60a277e96b5",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`day-readout-watch-service` is broken. day-readout-watch-service.service last said its work landed 2026-09-23T16:33:05.575Z, longer ago than the 900s it may go. This was seen at 2026-09-24T12:49:16.080Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u day-readout-watch-service.service`.\n",
} as const satisfies AgentMessage
