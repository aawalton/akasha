import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8a6d64706cfd = {
  id: "01a0d3d9-ac7e-7000-9f6f-8a6d64706cfd",
  type: "page-type/agent-message",
  slug: "message-8a6d64706cfd",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-24T14:37:32.955Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
