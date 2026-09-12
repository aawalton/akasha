import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message9141580897b6 = {
  id: "01a09662-1431-7000-a18f-9141580897b6",
  type: "message",
  slug: "message-9141580897b6",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`.\n",
} as const satisfies Message
