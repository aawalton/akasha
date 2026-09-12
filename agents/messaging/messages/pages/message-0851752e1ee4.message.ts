import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message0851752e1ee4 = {
  id: "01a09654-47b5-7000-b270-0851752e1ee4",
  type: "message",
  slug: "message-0851752e1ee4",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
