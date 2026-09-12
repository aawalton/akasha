import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message09613b51ffcb = {
  id: "01a09736-7615-7000-bf02-09613b51ffcb",
  type: "message",
  slug: "message-09613b51ffcb",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
