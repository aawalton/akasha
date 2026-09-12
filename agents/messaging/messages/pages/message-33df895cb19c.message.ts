import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message33df895cb19c = {
  id: "01a09764-3ccd-7000-a933-33df895cb19c",
  type: "message",
  slug: "message-33df895cb19c",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
