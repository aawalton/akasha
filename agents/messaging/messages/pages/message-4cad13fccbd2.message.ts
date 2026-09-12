import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message4cad13fccbd2 = {
  id: "01a0961d-67eb-7000-b0d0-4cad13fccbd2",
  type: "message",
  slug: "message-4cad13fccbd2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
