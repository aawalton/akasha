import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message5c55228dc558 = {
  id: "01a0b878-e28e-7000-a251-5c55228dc558",
  type: "page-type/message",
  slug: "message-5c55228dc558",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-19T07:01:11.000Z, and systemd says `exit-code`. This was seen at 2026-09-19T07:02:04.763Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies Message
