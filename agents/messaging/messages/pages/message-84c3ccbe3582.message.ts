import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message84c3ccbe3582 = {
  id: "01a096f3-98c5-7000-bdb2-84c3ccbe3582",
  type: "message",
  slug: "message-84c3ccbe3582",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
