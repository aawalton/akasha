import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD4d37517161b = {
  id: "01a09673-7071-7000-b7c3-d4d37517161b",
  type: "message",
  slug: "message-d4d37517161b",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
