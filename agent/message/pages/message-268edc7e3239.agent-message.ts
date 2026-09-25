import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message268edc7e3239 = {
  id: "01a0d92a-e3ea-7000-bb84-268edc7e3239",
  type: "page-type/agent-message",
  slug: "message-268edc7e3239",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`web-app-deploying` is broken. web-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-25T15:24:21.551Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u web-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
