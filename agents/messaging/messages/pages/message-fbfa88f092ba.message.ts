import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageFbfa88f092ba = {
  id: "01a09afc-53b0-7000-8b7c-fbfa88f092ba",
  type: "message",
  slug: "message-fbfa88f092ba",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
