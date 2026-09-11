import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const messageCace9dbf707b = {
  id: "01a091f4-a2e9-7000-a79e-cace9dbf707b",
  type: "message",
  slug: "message-cace9dbf707b",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`alan-email-worker` is broken. alan-email-worker.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u alan-email-worker.service`.\n",
} as const satisfies Message
