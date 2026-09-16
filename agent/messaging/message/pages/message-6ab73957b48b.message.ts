import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message6ab73957b48b = {
  id: "01a0aaaa-f20a-7000-ad23-6ab73957b48b",
  type: "page-type/message",
  slug: "message-6ab73957b48b",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed at 2026-09-16T14:42:00.000Z, and systemd says `exit-code`. This was seen at 2026-09-16T14:42:04.641Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
