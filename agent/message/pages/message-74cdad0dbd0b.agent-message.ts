import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message74cdad0dbd0b = {
  id: "01a0ca52-2e11-7000-b9ec-74cdad0dbd0b",
  type: "page-type/agent-message",
  slug: "message-74cdad0dbd0b",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-22T18:12:58.280Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
