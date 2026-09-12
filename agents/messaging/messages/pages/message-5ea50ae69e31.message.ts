import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message5ea50ae69e31 = {
  id: "01a0973a-fe7b-7000-97dc-5ea50ae69e31",
  type: "message",
  slug: "message-5ea50ae69e31",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
