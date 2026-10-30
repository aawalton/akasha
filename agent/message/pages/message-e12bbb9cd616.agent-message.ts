import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE12bbb9cd616 = {
  id: "01a18f18-73ad-7441-a3c0-e12bbb9cd616",
  type: "page-type/agent-message",
  slug: "message-e12bbb9cd616",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-30T23:15:06.000Z, and systemd says `exit-code`. This was seen at 2026-10-30T23:15:06.551Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
  createdAt: "2026-10-30T23:15:07.213Z",
  updatedAt: "2026-10-30T23:15:07.213Z",
} as const satisfies AgentMessage
