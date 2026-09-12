import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message014ca96b33af = {
  id: "01a097de-e230-7000-9bb7-014ca96b33af",
  type: "message",
  slug: "message-014ca96b33af",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
