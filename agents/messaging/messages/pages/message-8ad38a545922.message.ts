import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message8ad38a545922 = {
  id: "01a0968e-e290-7000-bafb-8ad38a545922",
  type: "message",
  slug: "message-8ad38a545922",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
