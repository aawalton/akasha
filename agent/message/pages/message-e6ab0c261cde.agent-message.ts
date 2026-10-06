import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE6ab0c261cde = {
  id: "01a11108-1f45-7000-a0e5-e6ab0c261cde",
  type: "page-type/agent-message",
  slug: "message-e6ab0c261cde",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-06T11:45:06.000Z, and systemd says `exit-code`. This was seen at 2026-10-06T11:45:07.130Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies AgentMessage
