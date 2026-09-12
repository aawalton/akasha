import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message23ade217820f = {
  id: "01a0980d-a0d1-7000-89ab-23ade217820f",
  type: "message",
  slug: "message-23ade217820f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
