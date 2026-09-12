import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const message963e93ae9388 = {
  id: "01a095c1-de55-7000-b6ce-963e93ae9388",
  type: "message",
  slug: "message-963e93ae9388",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`apns-push-notifier` is broken. apns-push-notifier.service is `deactivating` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u apns-push-notifier.service`.\n",
} as const satisfies Message
