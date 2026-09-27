import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message075b14fc85c0 = {
  id: "01a0e335-9dff-7000-86e6-075b14fc85c0",
  type: "page-type/agent-message",
  slug: "message-075b14fc85c0",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-watching` is broken. cluster-watching.service failed at 2026-09-27T14:12:13.000Z, and systemd says `timeout`. This was seen at 2026-09-27T14:12:16.623Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-watching.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
