import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message5dc769ca22ba = {
  id: "01a09b38-c4aa-7000-8728-5dc769ca22ba",
  type: "message",
  slug: "message-5dc769ca22ba",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
