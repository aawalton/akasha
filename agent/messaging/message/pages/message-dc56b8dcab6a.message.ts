import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageDc56b8dcab6a = {
  id: "01a0a2a1-bb6b-7000-b663-dc56b8dcab6a",
  type: "message",
  slug: "message-dc56b8dcab6a",
  to: "seat/athena",
  from: "service-watching",
  warrant: "announce",
  body: "`sweep-subagent-pages` is broken. sweep-subagent-pages.service failed at 2026-09-15T01:15:02.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T01:15:02.588Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u sweep-subagent-pages.service`.\n",
} as const satisfies Message
