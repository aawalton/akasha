import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message02c184b9602c = {
  id: "01a0d94e-f9f9-7000-b353-02c184b9602c",
  type: "page-type/agent-message",
  slug: "message-02c184b9602c",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-09-25T16:03:46.000Z, and systemd says `exit-code`. This was seen at 2026-09-25T16:03:46.517Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`. This was meant for `elin`, whom nothing could reach: no seat holds the name `elin`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
