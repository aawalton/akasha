import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0f17faa1e82e = {
  id: "01a0ca39-86df-7000-b5d8-0f17faa1e82e",
  type: "page-type/agent-message",
  slug: "message-0f17faa1e82e",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-22T17:46:02.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T17:46:02.599Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies AgentMessage
