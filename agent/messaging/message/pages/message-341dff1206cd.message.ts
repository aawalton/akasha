import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message341dff1206cd = {
  id: "01a0a580-6864-7000-83af-341dff1206cd",
  type: "message",
  slug: "message-341dff1206cd",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-09-15T14:36:58.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T14:37:03.663Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
