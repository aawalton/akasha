import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageC71548271ff7 = {
  id: "01a096e8-a6f7-7000-a76f-c71548271ff7",
  type: "message",
  slug: "message-c71548271ff7",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
