import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const messageC03e603c4dd0 = {
  id: "01a091ff-a89d-7000-ac7c-c03e603c4dd0",
  type: "message",
  slug: "message-c03e603c4dd0",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`alan-email-worker` is broken. alan-email-worker.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u alan-email-worker.service`.\n",
} as const satisfies Message
