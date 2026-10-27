import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message5531254a48c2 = {
  id: "01a17c4a-0dcb-7000-9e26-5531254a48c2",
  type: "page-type/agent-message",
  slug: "message-5531254a48c2",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-10-27T07:36:30.137Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-27T07:36:30.854Z",
  updatedAt: "2026-10-27T07:36:30.854Z",
} as const satisfies AgentMessage
