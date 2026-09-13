import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageEa4b767ea0ae = {
  id: "01a09afa-08b4-7000-8993-ea4b767ea0ae",
  type: "message",
  slug: "message-ea4b767ea0ae",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`sleep-relay-service` is broken. sleep-relay-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u sleep-relay-service.service`. This was meant for `ione`, whom nothing could reach: no seat holds the name `ione`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
