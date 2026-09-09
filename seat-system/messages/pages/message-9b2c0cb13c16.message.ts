import type { Message } from "../message.page-type.ts"

export const message9b2c0cb13c16 = {
  id: "01a082c9-da0c-7000-a039-9b2c0cb13c16",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-9b2c0cb13c16",
  to: "ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies Message
