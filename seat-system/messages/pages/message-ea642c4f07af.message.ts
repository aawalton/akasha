import type { Message } from "../message.page-type.types.ts"

export const messageEa642c4f07af = {
  id: "01a08afe-fe27-7000-8c35-ea642c4f07af",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-ea642c4f07af",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`capacity-reading-service` is broken. capacity-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u capacity-reading-service.service`.\n",
} as const satisfies Message
