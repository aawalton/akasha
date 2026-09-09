import type { Message } from "../message.page-type.ts"

export const messageA2da0e6c8ebd = {
  id: "01a082a4-e870-7000-bba3-a2da0e6c8ebd",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-a2da0e6c8ebd",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
