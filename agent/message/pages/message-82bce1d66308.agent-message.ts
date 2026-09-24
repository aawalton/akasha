import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message82bce1d66308 = {
  id: "01a0d376-957e-7000-9e7a-82bce1d66308",
  type: "page-type/agent-message",
  slug: "message-82bce1d66308",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-09-24T12:49:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:49:18.374Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies AgentMessage
