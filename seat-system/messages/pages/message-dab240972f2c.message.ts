import type { Message } from "../message.page-type.ts"

export const messageDab240972f2c = {
  id: "01a082b4-14eb-7000-9e82-dab240972f2c",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-dab240972f2c",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`attributes-reading-service` is broken. attributes-reading-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u attributes-reading-service.service`.\n",
} as const satisfies Message
