import type { Message } from "../message.page-type.types.ts"

export const message164d11ba8a09 = {
  id: "01a08aec-b60a-7000-acf5-164d11ba8a09",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-164d11ba8a09",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`sleep-reading-service` is broken. sleep-reading-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u sleep-reading-service.service`. This was meant for `ione`, whom nothing could reach: no seat holds the name `ione`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
