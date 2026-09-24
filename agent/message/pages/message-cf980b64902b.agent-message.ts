import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageCf980b64902b = {
  id: "01a0d504-92ae-7000-a0ee-cf980b64902b",
  type: "page-type/agent-message",
  slug: "message-cf980b64902b",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`apns-push-notifier` is broken. apns-push-notifier.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-24T20:04:01.509Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u apns-push-notifier.service`.\n",
} as const satisfies AgentMessage
