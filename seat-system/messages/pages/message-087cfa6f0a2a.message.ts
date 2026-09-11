import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const message087cfa6f0a2a = {
  id: "01a0888b-ed2a-7000-8b91-087cfa6f0a2a",
  type: "message",
  slug: "message-087cfa6f0a2a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-tracking-poll` is broken. inbox-tracking-poll.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-tracking-poll.service`.\n",
} as const satisfies Message
