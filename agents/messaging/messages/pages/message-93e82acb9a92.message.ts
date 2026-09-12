import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message93e82acb9a92 = {
  id: "01a097d2-fc3f-7000-bd39-93e82acb9a92",
  type: "message",
  slug: "message-93e82acb9a92",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
