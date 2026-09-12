import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message5fd15d0b67ba = {
  id: "01a097a6-1cb9-7000-bd2f-5fd15d0b67ba",
  type: "message",
  slug: "message-5fd15d0b67ba",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
