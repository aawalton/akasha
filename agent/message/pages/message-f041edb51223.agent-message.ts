import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF041edb51223 = {
  id: "01a168fa-2037-7000-85c0-f041edb51223",
  type: "page-type/agent-message",
  slug: "message-f041edb51223",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-10-23T13:36:24.000Z, and systemd says `exit-code`. This was seen at 2026-10-23T13:36:24.881Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-23T13:36:25.534Z",
  updatedAt: "2026-10-23T13:36:25.534Z",
} as const satisfies AgentMessage
