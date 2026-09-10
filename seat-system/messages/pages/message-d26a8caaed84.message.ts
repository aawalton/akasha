import type { Message } from "../message.page-type.types.ts"

export const messageD26a8caaed84 = {
  id: "01a0888b-e504-7000-ba2e-d26a8caaed84",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-d26a8caaed84",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`active-calories-service` is broken. active-calories-service.service failed, and systemd says `exit-code`. It has been broken since 2026-09-08T21:01:00.262Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u active-calories-service.service`.\n",
} as const satisfies Message
