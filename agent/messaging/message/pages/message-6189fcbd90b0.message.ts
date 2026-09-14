import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message6189fcbd90b0 = {
  id: "01a0a1d6-7402-7000-8c92-6189fcbd90b0",
  type: "message",
  slug: "message-6189fcbd90b0",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed at 2026-09-14T21:32:04.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T21:33:01.151Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies Message
