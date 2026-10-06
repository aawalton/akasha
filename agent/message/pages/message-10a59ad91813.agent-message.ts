import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message10a59ad91813 = {
  id: "01a11296-d138-7000-8f83-10a59ad91813",
  type: "page-type/agent-message",
  slug: "message-10a59ad91813",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`music-capture` is broken. music-capture.service failed at 2026-10-06T19:00:35.000Z, and systemd says `exit-code`. This was seen at 2026-10-06T19:00:36.027Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u music-capture.service`. This was meant for `eppie`, whom nothing could reach: no seat holds the name `eppie`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
