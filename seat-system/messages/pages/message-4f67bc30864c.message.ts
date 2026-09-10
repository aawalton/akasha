import type { Message } from "../message.page-type.types.ts"

export const message4f67bc30864c = {
  id: "01a0888b-f7eb-7000-9821-4f67bc30864c",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-4f67bc30864c",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`overdue-rolling` is broken. overdue-rolling.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u overdue-rolling.service`.\n",
} as const satisfies Message
