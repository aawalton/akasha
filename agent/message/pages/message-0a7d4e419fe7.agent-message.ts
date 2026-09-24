import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0a7d4e419fe7 = {
  id: "01a0d377-5bf3-7000-9fce-0a7d4e419fe7",
  type: "page-type/agent-message",
  slug: "message-0a7d4e419fe7",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-09-24T12:49:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:50:03.845Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies AgentMessage
