import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message8dd6a91a6f61 = {
  id: "01a0a196-66e2-7000-af2a-8dd6a91a6f61",
  type: "message",
  slug: "message-8dd6a91a6f61",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T20:22:12.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:23:03.473Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
