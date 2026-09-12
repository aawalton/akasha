import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB880a55b24bc = {
  id: "01a09679-dcad-7000-9aac-b880a55b24bc",
  type: "message",
  slug: "message-b880a55b24bc",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
