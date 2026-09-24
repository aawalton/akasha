import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC137d1baceff = {
  id: "01a0d377-4539-7000-9920-c137d1baceff",
  type: "page-type/agent-message",
  slug: "message-c137d1baceff",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`persona-email-routing` is broken. persona-email-routing.service failed at 2026-09-24T12:49:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:50:03.845Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u persona-email-routing.service`.\n",
} as const satisfies AgentMessage
