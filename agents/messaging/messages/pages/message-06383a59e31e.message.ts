import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message06383a59e31e = {
  id: "01a09afa-3184-7000-83f3-06383a59e31e",
  type: "message",
  slug: "message-06383a59e31e",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`topic-words-service` is broken. topic-words-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u topic-words-service.service`.\n",
} as const satisfies Message
