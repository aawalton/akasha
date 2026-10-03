import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF362bd56ce59 = {
  id: "01a10102-8996-7000-93a4-f362bd56ce59",
  type: "page-type/agent-message",
  slug: "message-f362bd56ce59",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-03T09:05:05.000Z, and systemd says `exit-code`. This was seen at 2026-10-03T09:05:05.588Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies AgentMessage
