import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC81f312a597d = {
  id: "01a11c0a-05c7-7000-88d6-c81f312a597d",
  type: "page-type/agent-message",
  slug: "message-c81f312a597d",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-10-08T15:03:00.000Z, and systemd says `exit-code`. This was seen at 2026-10-08T15:03:00.985Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-08T15:03:01.739Z",
  updatedAt: "2026-10-08T15:03:01.739Z",
} as const satisfies AgentMessage
