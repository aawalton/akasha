import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message4eedd3535359 = {
  id: "01a0ba2c-14f8-7000-baf6-4eedd3535359",
  type: "page-type/message",
  slug: "message-4eedd3535359",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`page-service` is broken. page-service.service is not listening at workstation.alanwalton.ts.net, which its page states. This was seen at 2026-09-19T14:57:04.894Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u page-service.service`. This was meant for `astra`, whom nothing could reach: no seat holds the name `astra`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
