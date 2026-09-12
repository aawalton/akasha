import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD89cf101d918 = {
  id: "01a096f7-4c4a-7000-be1c-d89cf101d918",
  type: "message",
  slug: "message-d89cf101d918",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
