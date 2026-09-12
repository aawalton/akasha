import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message9e8dc481d1bf = {
  id: "01a097f0-5207-7000-8af7-9e8dc481d1bf",
  type: "message",
  slug: "message-9e8dc481d1bf",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`eso-addon-deploying` is broken. eso-addon-deploying.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u eso-addon-deploying.service`.\n",
} as const satisfies Message
