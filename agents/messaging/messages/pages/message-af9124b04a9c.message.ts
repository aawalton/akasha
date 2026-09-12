import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageAf9124b04a9c = {
  id: "01a09642-effd-7000-9df2-af9124b04a9c",
  type: "message",
  slug: "message-af9124b04a9c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
