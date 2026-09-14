import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD4c4b8fa5f57 = {
  id: "01a0a02b-e18b-7000-bf0a-d4c4b8fa5f57",
  type: "message",
  slug: "message-d4c4b8fa5f57",
  to: "eppie",
  from: "service-watching",
  warrant: "announce",
  body: "`spotify-sync` is broken. spotify-sync.service failed at 2026-09-14T13:46:21.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T13:47:03.680Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u spotify-sync.service`.\n",
} as const satisfies Message
