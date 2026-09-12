import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message9734a4662958 = {
  id: "01a097dc-2e54-7000-a1af-9734a4662958",
  type: "message",
  slug: "message-9734a4662958",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
