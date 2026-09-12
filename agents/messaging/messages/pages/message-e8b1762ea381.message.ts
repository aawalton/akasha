import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageE8b1762ea381 = {
  id: "01a097d9-696d-7000-aa82-e8b1762ea381",
  type: "message",
  slug: "message-e8b1762ea381",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
