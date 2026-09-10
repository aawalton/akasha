import type { Message } from "../message.page-type.types.ts"

export const messageB02dacd07005 = {
  id: "01a082b6-6a3f-7000-bde6-b02dacd07005",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-b02dacd07005",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`attributes-reading-service` is broken. attributes-reading-service.service failed, and systemd says `timeout`. It has been broken since 2026-09-08T20:27:04.733Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u attributes-reading-service.service`.\n",
} as const satisfies Message
