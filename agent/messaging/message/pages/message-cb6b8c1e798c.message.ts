import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCb6b8c1e798c = {
  id: "01a0a1c6-e9a7-7000-867b-cb6b8c1e798c",
  type: "message",
  slug: "message-cb6b8c1e798c",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-09-14T21:15:20.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:16:02.689Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`.\n",
} as const satisfies Message
