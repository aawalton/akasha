import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB7cd40c7ef61 = {
  id: "01a0d37a-e3e3-7000-b589-b7cd40c7ef61",
  type: "page-type/agent-message",
  slug: "message-b7cd40c7ef61",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-09-24T12:53:22.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:54:01.137Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`. This was meant for `elin`, whom nothing could reach: no seat holds the name `elin`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
