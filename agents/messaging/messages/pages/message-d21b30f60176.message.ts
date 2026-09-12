import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD21b30f60176 = {
  id: "01a0964c-f91b-7000-aaab-d21b30f60176",
  type: "message",
  slug: "message-d21b30f60176",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
