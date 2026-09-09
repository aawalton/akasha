import type { Message } from "../message.page-type.ts"

export const messageE0f5a7df907a = {
  id: "01a082b6-8771-7000-a790-e0f5a7df907a",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-e0f5a7df907a",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`plants-reading-service` is broken. plants-reading-service.service failed, and systemd says `timeout`. It has been broken since 2026-09-08T20:27:04.733Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u plants-reading-service.service`.\n",
} as const satisfies Message
