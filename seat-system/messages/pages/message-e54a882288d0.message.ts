import type { Message } from "../message.page-type.types.ts"

export const messageE54a882288d0 = {
  id: "01a08ac3-81f9-7000-bfa8-e54a882288d0",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-e54a882288d0",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`surplus-reading-service` is broken. surplus-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u surplus-reading-service.service`.\n",
} as const satisfies Message
