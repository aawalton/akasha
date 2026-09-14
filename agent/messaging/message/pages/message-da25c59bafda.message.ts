import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageDa25c59bafda = {
  id: "01a0a1c5-f7a3-7000-97d6-da25c59bafda",
  type: "message",
  slug: "message-da25c59bafda",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-14T21:14:06.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:15:00.746Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
