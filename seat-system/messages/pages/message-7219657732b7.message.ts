import type { Message } from "../message.page-type.ts"

export const message7219657732b7 = {
  id: "01a0823b-f5e0-7000-a1b7-7219657732b7",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-7219657732b7",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
