import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message566c2a625ddc = {
  id: "01a0a664-1a75-7000-93e4-566c2a625ddc",
  type: "page-type/message",
  slug: "message-566c2a625ddc",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-15T18:45:14.000Z, and systemd says `exit-code`. This was seen at 2026-09-15T18:46:02.511Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
