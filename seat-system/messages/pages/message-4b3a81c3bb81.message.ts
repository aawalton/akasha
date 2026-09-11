import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const message4b3a81c3bb81 = {
  id: "01a091d1-d7a8-7000-899c-4b3a81c3bb81",
  type: "message",
  slug: "message-4b3a81c3bb81",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`.\n",
} as const satisfies Message
