import type { Message } from "../message.page-type.types.ts"

export const message9629b9b7fa2a = {
  id: "01a082c5-fa65-7000-abfa-9629b9b7fa2a",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-9629b9b7fa2a",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`activity-reading-service` is broken. activity-reading-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u activity-reading-service.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
