import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message02af2addf92a = {
  id: "01a097c9-d0a0-7000-b028-02af2addf92a",
  type: "message",
  slug: "message-02af2addf92a",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
