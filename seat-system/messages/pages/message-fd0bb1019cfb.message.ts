import type { Message } from "../message.page-type.types.ts"

export const messageFd0bb1019cfb = {
  id: "01a082b6-825e-7000-a842-fd0bb1019cfb",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-fd0bb1019cfb",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed, and systemd says `timeout`. It has been broken since 2026-09-08T20:27:04.733Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies Message
