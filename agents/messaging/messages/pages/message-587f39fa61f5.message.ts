import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message587f39fa61f5 = {
  id: "01a09665-ab29-7000-8af6-587f39fa61f5",
  type: "message",
  slug: "message-587f39fa61f5",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
