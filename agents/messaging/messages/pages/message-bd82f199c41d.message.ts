import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBd82f199c41d = {
  id: "01a0a12a-cdbd-7000-8bd2-bd82f199c41d",
  type: "message",
  slug: "message-bd82f199c41d",
  to: "athena",
  from: "service-watching",
  warrant: "announce",
  body: "`sweep-subagent-pages` is broken. sweep-subagent-pages.service failed at 2026-09-14T18:23:52.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T18:25:00.512Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u sweep-subagent-pages.service`.\n",
} as const satisfies Message
