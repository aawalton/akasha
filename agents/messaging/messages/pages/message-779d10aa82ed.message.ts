import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message779d10aa82ed = {
  id: "01a095b6-e009-7000-8f05-779d10aa82ed",
  type: "message",
  slug: "message-779d10aa82ed",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`.\n",
} as const satisfies Message
