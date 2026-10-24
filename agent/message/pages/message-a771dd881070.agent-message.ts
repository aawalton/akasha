import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA771dd881070 = {
  id: "01a16dd6-fd81-7000-80e8-a771dd881070",
  type: "page-type/agent-message",
  slug: "message-a771dd881070",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-10-24T12:16:08.000Z, and systemd says `exit-code`. This was seen at 2026-10-24T12:16:08.281Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
  createdAt: "2026-10-24T12:16:09.033Z",
  updatedAt: "2026-10-24T12:16:09.033Z",
} as const satisfies AgentMessage
