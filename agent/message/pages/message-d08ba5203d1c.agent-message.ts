import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD08ba5203d1c = {
  id: "01a0d3a2-4922-7000-b761-d08ba5203d1c",
  type: "page-type/agent-message",
  slug: "message-d08ba5203d1c",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`great-courses-sync` is broken. great-courses-sync.service failed at 2026-09-24T13:37:00.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T13:37:02.946Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u great-courses-sync.service`. This was meant for `elin`, whom nothing could reach: no seat holds the name `elin`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
