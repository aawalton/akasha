import type { Message } from "akasha/agents/messaging/message/message.page-type.types.ts"

export const message6ffe0ce71926 = {
  id: "01a0a0a7-9208-7000-ba92-6ffe0ce71926",
  type: "message",
  slug: "message-6ffe0ce71926",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-14T16:01:21.000Z, and systemd says `signal`. This was seen at 2026-09-14T16:02:05.142Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
