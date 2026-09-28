import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message837b5fdb2d8e = {
  id: "01a0e89e-9bd1-7000-bb8e-837b5fdb2d8e",
  type: "page-type/agent-message",
  slug: "message-837b5fdb2d8e",
  to: "seat/ember",
  from: "service-watching",
  warrant: "announce",
  body: "`ttc-client` is broken. ttc-client.service is `inactive` rather than running, and has been since 2026-09-28T15:22:20.000Z. This was seen at 2026-09-28T15:25:03.491Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u ttc-client.service`.\n",
} as const satisfies AgentMessage
