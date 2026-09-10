import type { Message } from "../message.page-type.types.ts"

export const messageFc52b30ce1e6 = {
  id: "01a082b8-a193-7000-b057-fc52b30ce1e6",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-fc52b30ce1e6",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`surplus-reading-service` is broken. surplus-reading-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u surplus-reading-service.service`.\n",
} as const satisfies Message
