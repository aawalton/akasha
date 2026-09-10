import type { Message } from "../message.page-type.types.ts"

export const message949861c1d28b = {
  id: "01a08ac3-7cb3-7000-8e70-949861c1d28b",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-949861c1d28b",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`capacity-reading-service` is broken. capacity-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u capacity-reading-service.service`.\n",
} as const satisfies Message
