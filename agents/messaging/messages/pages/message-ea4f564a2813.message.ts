import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageEa4f564a2813 = {
  id: "01a096ce-1bc3-7000-8bbe-ea4f564a2813",
  type: "message",
  slug: "message-ea4f564a2813",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
