import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB0f99c77e816 = {
  id: "01a097b5-b00a-7000-8119-b0f99c77e816",
  type: "message",
  slug: "message-b0f99c77e816",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
