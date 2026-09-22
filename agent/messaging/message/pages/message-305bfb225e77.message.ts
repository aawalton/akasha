import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message305bfb225e77 = {
  id: "01a0c97f-abbc-7000-bbaa-305bfb225e77",
  type: "page-type/message",
  slug: "message-305bfb225e77",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service last ended badly at 2026-09-22T14:22:52.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T14:23:02.193Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
