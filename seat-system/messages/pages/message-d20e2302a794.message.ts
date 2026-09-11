import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const messageD20e2302a794 = {
  id: "01a08db3-2695-7000-a246-d20e2302a794",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-d20e2302a794",
  to: "aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed, and systemd says `exit-code`. It has been broken since 2026-09-09T23:41:03.697Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`.\n",
} as const satisfies Message
