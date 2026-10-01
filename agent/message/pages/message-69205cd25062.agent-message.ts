import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message69205cd25062 = {
  id: "01a0f7fb-d263-7000-821d-69205cd25062",
  type: "page-type/agent-message",
  slug: "message-69205cd25062",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-10-01T15:01:10.000Z, and systemd says `exit-code`. This was seen at 2026-10-01T15:01:10.630Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies AgentMessage
