import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageA2db53a322f2 = {
  id: "01a097aa-b20b-7000-be9c-a2db53a322f2",
  type: "message",
  slug: "message-a2db53a322f2",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
