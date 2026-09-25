import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message256328fc9acf = {
  id: "01a0d995-bfe9-7000-8699-256328fc9acf",
  type: "page-type/agent-message",
  slug: "message-256328fc9acf",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-25T17:21:04.701Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
