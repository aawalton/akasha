import type { Message } from "../message.page-type.types.ts"

export const message5e49c25ef400 = {
  id: "01a082b3-f66d-7000-92e8-5e49c25ef400",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-5e49c25ef400",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`activity-reading-service` is broken. activity-reading-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u activity-reading-service.service`.\n",
} as const satisfies Message
