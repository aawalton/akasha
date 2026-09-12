import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageFa233db9ba20 = {
  id: "01a097d0-3f19-7000-bcb6-fa233db9ba20",
  type: "message",
  slug: "message-fa233db9ba20",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
