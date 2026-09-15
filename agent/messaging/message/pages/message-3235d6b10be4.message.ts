import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message3235d6b10be4 = {
  id: "01a0a2a3-93bc-7000-b949-3235d6b10be4",
  type: "message",
  slug: "message-3235d6b10be4",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-15T01:16:03.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T01:17:03.511Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
