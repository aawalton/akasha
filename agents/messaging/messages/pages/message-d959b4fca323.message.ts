import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD959b4fca323 = {
  id: "01a0961f-38cb-7000-a1e0-d959b4fca323",
  type: "message",
  slug: "message-d959b4fca323",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
