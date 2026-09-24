import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8c0546ed4067 = {
  id: "01a0d427-f92a-7000-b5d8-8c0546ed4067",
  type: "page-type/agent-message",
  slug: "message-8c0546ed4067",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-count-watch-service` is broken. inbox-count-watch-service.service last ended badly at 2026-09-24T16:03:02.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T16:03:04.298Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-count-watch-service.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
