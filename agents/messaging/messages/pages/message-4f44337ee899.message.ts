import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message4f44337ee899 = {
  id: "01a09afa-3eb5-7000-b773-4f44337ee899",
  type: "message",
  slug: "message-4f44337ee899",
  to: "thea",
  from: "service-watching",
  warrant: "announce",
  body: "`audit-running` is broken. audit-running.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u audit-running.service`.\n",
} as const satisfies Message
