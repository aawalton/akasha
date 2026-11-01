import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF173bd679e74 = {
  id: "01a195b5-3d52-7665-9683-f173bd679e74",
  type: "page-type/agent-message",
  slug: "message-f173bd679e74",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-sync` is broken. monarch-sync.service failed at 2026-11-01T06:00:59.000Z, and systemd says `exit-code`. This was seen at 2026-11-01T06:04:05.014Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-sync.service`.\n",
  createdAt: "2026-11-01T06:04:05.700Z",
  updatedAt: "2026-11-01T06:04:05.700Z",
} as const satisfies AgentMessage
