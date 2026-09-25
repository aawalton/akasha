import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAda6c400b239 = {
  id: "01a0d980-cdbb-7000-a851-ada6c400b239",
  type: "page-type/agent-message",
  slug: "message-ada6c400b239",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-25T16:58:11.000Z, and systemd says `exit-code`. This was seen at 2026-09-25T16:58:12.006Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
