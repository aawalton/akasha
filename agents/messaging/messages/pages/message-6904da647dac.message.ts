import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message6904da647dac = {
  id: "01a09715-8969-7000-9363-6904da647dac",
  type: "message",
  slug: "message-6904da647dac",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
