import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageB0cd8b7e753d = {
  id: "01a0c495-b70e-7000-a2c3-b0cd8b7e753d",
  type: "page-type/message",
  slug: "message-b0cd8b7e753d",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-21T15:28:43.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T15:29:00.888Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
