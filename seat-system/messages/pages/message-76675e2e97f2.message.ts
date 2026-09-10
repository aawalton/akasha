import type { Message } from "../message.page-type.types.ts"

export const message76675e2e97f2 = {
  id: "01a082b0-f94f-7000-b07f-76675e2e97f2",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-76675e2e97f2",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`activity-relay-service` is broken. activity-relay-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u activity-relay-service.service`.\n",
} as const satisfies Message
