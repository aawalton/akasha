import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageBb0eed932a3c = {
  id: "01a09b62-d5ed-7000-963f-bb0eed932a3c",
  type: "message",
  slug: "message-bb0eed932a3c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-deploying` is broken. workstation-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-deploying.service`.\n",
} as const satisfies Message
