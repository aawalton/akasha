import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0da43c29cbda = {
  id: "01a0e80c-33f3-7000-8629-0da43c29cbda",
  type: "page-type/agent-message",
  slug: "message-0da43c29cbda",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-28T12:45:08.723Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
