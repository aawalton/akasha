import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const message4cbac566faab = {
  id: "01a091ed-510a-7000-9a6a-4cbac566faab",
  type: "message",
  slug: "message-4cbac566faab",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`alan-email-worker` is broken. alan-email-worker.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u alan-email-worker.service`.\n",
} as const satisfies Message
