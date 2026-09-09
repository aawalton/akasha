import type { Message } from "../message.page-type.ts"

export const message208c0fc91351 = {
  id: "01a08225-0f75-7000-be1d-208c0fc91351",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-208c0fc91351",
  to: "akasha",
  from: "service-watching",
  warrant: "announce",
  body: "`active-calories-service` is broken. active-calories-service.service failed, and systemd says `exit-code` It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u active-calories-service.service`.\n",
} as const satisfies Message
