import type { Message } from "../message.page-type.types.ts"

export const message03f9cf0386bc = {
  id: "01a0888b-f566-7000-923d-03f9cf0386bc",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-03f9cf0386bc",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`.\n",
} as const satisfies Message
