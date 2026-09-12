import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message79ec34c44ef2 = {
  id: "01a096d2-a462-7000-abd3-79ec34c44ef2",
  type: "message",
  slug: "message-79ec34c44ef2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
