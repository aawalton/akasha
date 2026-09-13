import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB99624401a95 = {
  id: "01a09aff-fe66-7000-990b-b99624401a95",
  type: "message",
  slug: "message-b99624401a95",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
