import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6fab7d8dd812 = {
  id: "01a16047-5de9-7000-84fa-6fab7d8dd812",
  type: "page-type/agent-message",
  slug: "message-6fab7d8dd812",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-10-21T21:04:11.910Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-21T21:04:12.684Z",
  updatedAt: "2026-10-21T21:04:12.684Z",
} as const satisfies AgentMessage
