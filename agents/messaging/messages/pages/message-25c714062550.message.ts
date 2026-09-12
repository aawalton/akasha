import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message25c714062550 = {
  id: "01a09599-a39d-7000-9116-25c714062550",
  type: "message",
  slug: "message-25c714062550",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-deploying` is broken. workstation-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-deploying.service`.\n",
} as const satisfies Message
