import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message1ce0042633eb = {
  id: "01a0963d-76ab-7000-ac2a-1ce0042633eb",
  type: "message",
  slug: "message-1ce0042633eb",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
