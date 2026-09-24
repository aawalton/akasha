import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC0bd03e1e411 = {
  id: "01a0d410-cc19-7000-a8e2-c0bd03e1e411",
  type: "page-type/agent-message",
  slug: "message-c0bd03e1e411",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`container-recipe-deploying` is broken. container-recipe-deploying.service failed at 2026-09-24T15:37:45.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T15:37:45.524Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u container-recipe-deploying.service`.\n",
} as const satisfies AgentMessage
