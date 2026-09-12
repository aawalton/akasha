import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message597bf743a48e = {
  id: "01a09638-d6a5-7000-a24c-597bf743a48e",
  type: "message",
  slug: "message-597bf743a48e",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
