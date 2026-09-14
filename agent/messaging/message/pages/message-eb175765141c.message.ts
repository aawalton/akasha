import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageEb175765141c = {
  id: "01a0a1dd-d5b8-7000-8e1b-eb175765141c",
  type: "message",
  slug: "message-eb175765141c",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-09-14T21:40:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:41:04.926Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`.\n",
} as const satisfies Message
