import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC4588ae4cbcf = {
  id: "01a18f15-c32e-7122-8c4c-c4588ae4cbcf",
  type: "page-type/agent-message",
  slug: "message-c4588ae4cbcf",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-10-30T23:12:10.000Z, and systemd says `exit-code`. This was seen at 2026-10-30T23:12:10.288Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
  createdAt: "2026-10-30T23:12:10.981Z",
  updatedAt: "2026-10-30T23:12:10.981Z",
} as const satisfies AgentMessage
