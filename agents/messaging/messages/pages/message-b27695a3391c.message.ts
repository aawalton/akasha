import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB27695a3391c = {
  id: "01a09770-1dea-7000-a193-b27695a3391c",
  type: "message",
  slug: "message-b27695a3391c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
