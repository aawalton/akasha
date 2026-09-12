import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message222ac56a4efb = {
  id: "01a09724-2a55-7000-9a15-222ac56a4efb",
  type: "message",
  slug: "message-222ac56a4efb",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
