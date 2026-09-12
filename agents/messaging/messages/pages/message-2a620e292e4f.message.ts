import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message2a620e292e4f = {
  id: "01a097c8-05a2-7000-812a-2a620e292e4f",
  type: "message",
  slug: "message-2a620e292e4f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
