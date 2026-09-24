import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6c413bdbef04 = {
  id: "01a0d377-7560-7000-828f-6c413bdbef04",
  type: "page-type/agent-message",
  slug: "message-6c413bdbef04",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-24T12:49:21.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:50:03.845Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies AgentMessage
