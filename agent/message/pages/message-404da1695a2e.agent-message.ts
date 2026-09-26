import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message404da1695a2e = {
  id: "01a0de2a-80f3-7000-a568-404da1695a2e",
  type: "page-type/agent-message",
  slug: "message-404da1695a2e",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed at 2026-09-26T14:41:19.000Z, and systemd says `exit-code`. This was seen at 2026-09-26T14:42:02.249Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
