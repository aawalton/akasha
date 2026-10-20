import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageDf930ebf62d7 = {
  id: "01a15aac-6820-7000-abf0-df930ebf62d7",
  type: "page-type/agent-message",
  slug: "message-df930ebf62d7",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-10-20T18:56:50.411Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-20T18:56:51.241Z",
  updatedAt: "2026-10-20T18:56:51.241Z",
} as const satisfies AgentMessage
