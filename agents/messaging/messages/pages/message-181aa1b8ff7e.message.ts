import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message181aa1b8ff7e = {
  id: "01a09766-fbc0-7000-9266-181aa1b8ff7e",
  type: "message",
  slug: "message-181aa1b8ff7e",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
