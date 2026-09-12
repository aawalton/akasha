import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message519ce166a96f = {
  id: "01a0966e-f804-7000-b8d1-519ce166a96f",
  type: "message",
  slug: "message-519ce166a96f",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`.\n",
} as const satisfies Message
