import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message678978116ecf = {
  id: "01a09b42-c9ed-7000-9034-678978116ecf",
  type: "message",
  slug: "message-678978116ecf",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`.\n",
} as const satisfies Message
