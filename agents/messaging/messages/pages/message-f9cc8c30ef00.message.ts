import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF9cc8c30ef00 = {
  id: "01a0959e-2064-7000-a55a-f9cc8c30ef00",
  type: "message",
  slug: "message-f9cc8c30ef00",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-tracking-poll` is broken. inbox-tracking-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-tracking-poll.service`.\n",
} as const satisfies Message
