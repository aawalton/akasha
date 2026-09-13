import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message90d1d81d9e18 = {
  id: "01a09afa-9edb-7000-878b-90d1d81d9e18",
  type: "message",
  slug: "message-90d1d81d9e18",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`persona-points-rebuilding` is broken. persona-points-rebuilding.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u persona-points-rebuilding.service`.\n",
} as const satisfies Message
