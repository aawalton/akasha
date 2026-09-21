import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageEe08915d8c20 = {
  id: "01a0c4cd-9818-7000-9aaf-ee08915d8c20",
  type: "page-type/message",
  slug: "message-ee08915d8c20",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-21T16:29:32.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T16:30:02.977Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
