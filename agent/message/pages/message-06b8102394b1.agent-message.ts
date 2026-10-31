import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message06b8102394b1 = {
  id: "01a1943e-f4b7-74f3-9b4c-06b8102394b1",
  type: "page-type/agent-message",
  slug: "message-06b8102394b1",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-31T23:15:15.000Z, and systemd says `exit-code`. This was seen at 2026-10-31T23:15:16.050Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
  createdAt: "2026-10-31T23:15:16.642Z",
  updatedAt: "2026-10-31T23:15:16.642Z",
} as const satisfies AgentMessage
