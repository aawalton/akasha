import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3596a5c21ca1 = {
  id: "01a0967d-825e-7000-a8ef-3596a5c21ca1",
  type: "message",
  slug: "message-3596a5c21ca1",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
