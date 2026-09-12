import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageE903f827d304 = {
  id: "01a0965f-5297-7000-9dae-e903f827d304",
  type: "message",
  slug: "message-e903f827d304",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
