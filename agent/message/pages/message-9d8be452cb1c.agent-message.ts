import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9d8be452cb1c = {
  id: "01a11a84-6be6-7000-af0b-9d8be452cb1c",
  type: "page-type/agent-message",
  slug: "message-9d8be452cb1c",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`ios-app-deploying` is broken. ios-app-deploying.service failed at 2026-10-08T07:57:27.000Z, and systemd says `exit-code`. This was seen at 2026-10-08T07:57:28.162Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ios-app-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
