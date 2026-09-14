import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const message6c957ba70295 = {
  id: "01a0a1e1-76fb-7000-88aa-6c957ba70295",
  type: "message",
  slug: "message-6c957ba70295",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-14T21:44:08.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:45:02.823Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
