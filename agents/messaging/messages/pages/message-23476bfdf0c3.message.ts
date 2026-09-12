import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message23476bfdf0c3 = {
  id: "01a097f4-e2ee-7000-8daf-23476bfdf0c3",
  type: "message",
  slug: "message-23476bfdf0c3",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
