import type { Message } from "../message.page-type.ts"

export const messageCa1cd11b9807 = {
  id: "01a082b4-01c4-7000-b10f-ca1cd11b9807",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-ca1cd11b9807",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`activity-relay-service` is broken. activity-relay-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u activity-relay-service.service`.\n",
} as const satisfies Message
