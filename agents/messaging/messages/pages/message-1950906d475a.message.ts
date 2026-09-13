import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message1950906d475a = {
  id: "01a09afa-8091-7000-844b-1950906d475a",
  type: "message",
  slug: "message-1950906d475a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-sync` is broken. monarch-sync.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-sync.service`.\n",
} as const satisfies Message
