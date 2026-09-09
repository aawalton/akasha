import type { Message } from "../message.page-type.ts"

export const message18956faee690 = {
  id: "01a082bd-25a8-7000-9099-18956faee690",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-18956faee690",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
