import type { Message } from "../message.page-type.types.ts"

export const message54965162af62 = {
  id: "01a082b6-a3de-7000-b01b-54965162af62",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-54965162af62",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`attributes-relay-service` is broken. attributes-relay-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u attributes-relay-service.service`.\n",
} as const satisfies Message
