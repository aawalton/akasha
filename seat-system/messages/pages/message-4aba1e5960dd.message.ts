import type { Message } from "../message.page-type.types.ts"

export const message4aba1e5960dd = {
  id: "01a082bd-2c2b-7000-a955-4aba1e5960dd",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-4aba1e5960dd",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`sleep-reading-service` is broken. sleep-reading-service.service failed, and systemd says `timeout`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u sleep-reading-service.service`. This was meant for `ione`, whom nothing could reach: no seat holds the name `ione`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
