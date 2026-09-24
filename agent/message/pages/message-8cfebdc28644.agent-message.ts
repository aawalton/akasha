import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8cfebdc28644 = {
  id: "01a0d377-8f90-7000-b3b7-8cfebdc28644",
  type: "page-type/agent-message",
  slug: "message-8cfebdc28644",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-sync` is broken. monarch-sync.service failed at 2026-09-24T12:49:21.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:50:03.845Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-sync.service`.\n",
} as const satisfies AgentMessage
