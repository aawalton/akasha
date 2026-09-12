import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message7c23a0e91c7f = {
  id: "01a09661-268e-7000-8e8a-7c23a0e91c7f",
  type: "message",
  slug: "message-7c23a0e91c7f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
