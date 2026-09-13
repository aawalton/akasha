import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message1402b492ee77 = {
  id: "01a09b15-0dd9-7000-8c41-1402b492ee77",
  type: "message",
  slug: "message-1402b492ee77",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
