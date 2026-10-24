import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF1b86664f18e = {
  id: "01a16dd6-a7b7-7000-83e8-f1b86664f18e",
  type: "page-type/agent-message",
  slug: "message-f1b86664f18e",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-24T12:15:46.000Z, and systemd says `exit-code`. This was seen at 2026-10-24T12:15:46.349Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
  createdAt: "2026-10-24T12:15:47.041Z",
  updatedAt: "2026-10-24T12:15:47.041Z",
} as const satisfies AgentMessage
