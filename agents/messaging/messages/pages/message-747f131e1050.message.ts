import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message747f131e1050 = {
  id: "01a097e6-4273-7000-9112-747f131e1050",
  type: "message",
  slug: "message-747f131e1050",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
