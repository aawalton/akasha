import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageCd4994cb8697 = {
  id: "01a09b7e-5d36-7000-9813-cd4994cb8697",
  type: "message",
  slug: "message-cd4994cb8697",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`inference-deploying` is broken. inference-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u inference-deploying.service`.\n",
} as const satisfies Message
