import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message25845f2610c1 = {
  id: "01a09691-ab7e-7000-be68-25845f2610c1",
  type: "message",
  slug: "message-25845f2610c1",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
