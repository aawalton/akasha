import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4fecb1712c4a = {
  id: "01a135b1-48a0-7000-a86a-4fecb1712c4a",
  type: "page-type/agent-message",
  slug: "message-4fecb1712c4a",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-10-13T14:36:12.000Z, and systemd says `exit-code`. This was seen at 2026-10-13T14:36:13.067Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-13T14:36:13.782Z",
  updatedAt: "2026-10-13T14:36:13.782Z",
} as const satisfies AgentMessage
