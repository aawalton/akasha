import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageCf202ce09f4f = {
  id: "01a09631-7d51-7000-a3c4-cf202ce09f4f",
  type: "message",
  slug: "message-cf202ce09f4f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
