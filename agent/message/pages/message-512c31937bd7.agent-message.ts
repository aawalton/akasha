import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message512c31937bd7 = {
  id: "01a0ceff-af0e-7000-aeea-512c31937bd7",
  type: "page-type/agent-message",
  slug: "message-512c31937bd7",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`music-capture` is broken. music-capture.service failed at 2026-09-23T16:00:57.000Z, and systemd says `exit-code`. This was seen at 2026-09-23T16:00:57.897Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u music-capture.service`. This was meant for `eppie`, whom nothing could reach: no seat holds the name `eppie`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
