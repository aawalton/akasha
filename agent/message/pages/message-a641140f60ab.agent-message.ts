import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA641140f60ab = {
  id: "01a1833c-4502-71e1-be23-a641140f60ab",
  type: "page-type/agent-message",
  slug: "message-a641140f60ab",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-10-28T15:58:47.000Z, and systemd says `exit-code`. This was seen at 2026-10-28T15:58:47.259Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-28T15:58:47.985Z",
  updatedAt: "2026-10-28T15:58:47.985Z",
} as const satisfies AgentMessage
