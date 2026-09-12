import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageA54e70872ce1 = {
  id: "01a09799-5a5d-7000-85ac-a54e70872ce1",
  type: "message",
  slug: "message-a54e70872ce1",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
