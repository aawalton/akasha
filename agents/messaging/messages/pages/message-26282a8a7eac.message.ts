import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message26282a8a7eac = {
  id: "01a0976e-460c-7000-854b-26282a8a7eac",
  type: "message",
  slug: "message-26282a8a7eac",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
