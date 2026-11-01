import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message303dfd773d44 = {
  id: "01a197c4-6e6b-7689-8858-303dfd773d44",
  type: "page-type/agent-message",
  slug: "message-303dfd773d44",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed at 2026-11-01T15:39:54.000Z, and systemd says `exit-code`. This was seen at 2026-11-01T15:39:55.141Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-11-01T15:39:55.756Z",
  updatedAt: "2026-11-01T15:39:55.756Z",
} as const satisfies AgentMessage
