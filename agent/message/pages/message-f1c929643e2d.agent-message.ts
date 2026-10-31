import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF1c929643e2d = {
  id: "01a1943c-ee26-75a5-841d-f1c929643e2d",
  type: "page-type/agent-message",
  slug: "message-f1c929643e2d",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-10-31T23:13:03.000Z, and systemd says `exit-code`. This was seen at 2026-10-31T23:13:03.271Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
  createdAt: "2026-10-31T23:13:04.023Z",
  updatedAt: "2026-10-31T23:13:04.023Z",
} as const satisfies AgentMessage
