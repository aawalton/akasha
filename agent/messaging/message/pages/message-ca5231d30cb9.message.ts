import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageCa5231d30cb9 = {
  id: "01a0a1aa-8c0a-7000-bad3-ca5231d30cb9",
  type: "message",
  slug: "message-ca5231d30cb9",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed at 2026-09-14T20:44:34.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T20:45:03.616Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
