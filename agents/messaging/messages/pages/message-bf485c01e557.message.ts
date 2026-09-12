import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBf485c01e557 = {
  id: "01a0972d-4255-7000-94da-bf485c01e557",
  type: "message",
  slug: "message-bf485c01e557",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
