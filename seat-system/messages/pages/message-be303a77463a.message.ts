import type { Message } from "../message.page-type.types.ts"

export const messageBe303a77463a = {
  id: "01a0888b-e21f-7000-b743-be303a77463a",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-be303a77463a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-reading-service` is broken. inbox-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-reading-service.service`.\n",
} as const satisfies Message
