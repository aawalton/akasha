import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message2af907ca77d0 = {
  id: "01a09710-0d7e-7000-ba6d-2af907ca77d0",
  type: "message",
  slug: "message-2af907ca77d0",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
