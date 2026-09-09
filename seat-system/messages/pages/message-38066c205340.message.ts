import type { Message } from "../message.page-type.ts"

export const message38066c205340 = {
  id: "01a082b6-713b-7000-8459-38066c205340",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-38066c205340",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`capacity-reading-service` is broken. capacity-reading-service.service failed, and systemd says `timeout`. It has been broken since 2026-09-08T20:27:04.733Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u capacity-reading-service.service`.\n",
} as const satisfies Message
