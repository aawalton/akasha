import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7c6542ca7b9e = {
  id: "01a11556-c94f-7000-9e9f-7c6542ca7b9e",
  type: "page-type/agent-message",
  slug: "message-7c6542ca7b9e",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-10-07T07:49:31.346Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
