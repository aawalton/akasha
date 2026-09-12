import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message9cd820edd0c3 = {
  id: "01a09635-2c66-7000-ac5d-9cd820edd0c3",
  type: "message",
  slug: "message-9cd820edd0c3",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
