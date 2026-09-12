import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message3cb927e547c9 = {
  id: "01a096a5-cfab-7000-a404-3cb927e547c9",
  type: "message",
  slug: "message-3cb927e547c9",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
