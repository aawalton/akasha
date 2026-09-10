import type { Message } from "../message.page-type.types.ts"

export const messageE705ba903482 = {
  id: "01a082bd-2df5-7000-8cad-e705ba903482",
  pageTypeSlug: "message",
  type: "message",
  slug: "message-e705ba903482",
  to: "alan",
  from: "service-watching",
  warrant: "announce",
  body: "`topic-words-service` is broken. topic-words-service.service failed, and systemd says `exit-code`. It broke just now. What that service is and what it runs are on its page. Its log is `journalctl --user -u topic-words-service.service`. This was meant for `akasha`, whom nothing could reach: no seat holds the name `akasha`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
