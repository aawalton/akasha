import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message32806ed90b34 = {
  id: "01a09708-a6cc-7000-939b-32806ed90b34",
  type: "message",
  slug: "message-32806ed90b34",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
