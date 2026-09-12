import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageE5e6e463b4b9 = {
  id: "01a09769-b3c0-7000-9726-e5e6e463b4b9",
  type: "message",
  slug: "message-e5e6e463b4b9",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
