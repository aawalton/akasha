import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message87800c40ea69 = {
  id: "01a0c49a-5aad-7000-bb68-87800c40ea69",
  type: "page-type/message",
  slug: "message-87800c40ea69",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-21T15:33:54.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T15:34:04.900Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
