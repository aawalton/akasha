import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageF927985b5175 = {
  id: "01a0977b-24bf-7000-8326-f927985b5175",
  type: "message",
  slug: "message-f927985b5175",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
