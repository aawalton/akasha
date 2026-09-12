import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message345d4b6ee4d5 = {
  id: "01a09729-b084-7000-8aab-345d4b6ee4d5",
  type: "message",
  slug: "message-345d4b6ee4d5",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
