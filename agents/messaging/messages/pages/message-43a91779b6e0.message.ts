import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message43a91779b6e0 = {
  id: "01a09705-f30e-7000-a2b2-43a91779b6e0",
  type: "message",
  slug: "message-43a91779b6e0",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
