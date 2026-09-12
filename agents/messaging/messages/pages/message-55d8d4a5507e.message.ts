import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message55d8d4a5507e = {
  id: "01a09750-1868-7000-bb1d-55d8d4a5507e",
  type: "message",
  slug: "message-55d8d4a5507e",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
