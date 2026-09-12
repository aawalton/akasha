import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageD34dad32b260 = {
  id: "01a0970a-95e5-7000-b4df-d34dad32b260",
  type: "message",
  slug: "message-d34dad32b260",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`.\n",
} as const satisfies Message
