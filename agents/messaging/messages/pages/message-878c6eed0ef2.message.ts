import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message878c6eed0ef2 = {
  id: "01a0969e-7bae-7000-924b-878c6eed0ef2",
  type: "message",
  slug: "message-878c6eed0ef2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
