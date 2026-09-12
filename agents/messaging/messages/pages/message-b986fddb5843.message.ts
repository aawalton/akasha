import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB986fddb5843 = {
  id: "01a09787-ebe1-7000-bb8f-b986fddb5843",
  type: "message",
  slug: "message-b986fddb5843",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
