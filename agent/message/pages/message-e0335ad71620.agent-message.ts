import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE0335ad71620 = {
  id: "01a0d376-93c1-7000-bd60-e0335ad71620",
  type: "page-type/agent-message",
  slug: "message-e0335ad71620",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`persona-email-routing` is broken. persona-email-routing.service failed at 2026-09-24T12:49:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:49:18.334Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u persona-email-routing.service`.\n",
} as const satisfies AgentMessage
