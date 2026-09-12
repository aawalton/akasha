import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message0f55ccb5e688 = {
  id: "01a0972b-74aa-7000-a6a0-0f55ccb5e688",
  type: "message",
  slug: "message-0f55ccb5e688",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
