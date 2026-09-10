import type { Message } from "../message.page-type.types.ts"

export const message2f79609f99a4 = {
  id: "01a08a83-6901-7000-b3f4-2f79609f99a4",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-2f79609f99a4",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
