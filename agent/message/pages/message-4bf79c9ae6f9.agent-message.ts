import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4bf79c9ae6f9 = {
  id: "01a1943c-ee90-7248-9748-4bf79c9ae6f9",
  type: "page-type/agent-message",
  slug: "message-4bf79c9ae6f9",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-10-31T23:13:03.000Z, and systemd says `exit-code`. This was seen at 2026-10-31T23:13:03.271Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
  createdAt: "2026-10-31T23:13:05.005Z",
  updatedAt: "2026-10-31T23:13:05.005Z",
} as const satisfies AgentMessage
