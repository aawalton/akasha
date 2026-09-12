import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB060ff569340 = {
  id: "01a09796-9bd0-7000-abca-b060ff569340",
  type: "message",
  slug: "message-b060ff569340",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
