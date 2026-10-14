import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF326ff508121 = {
  id: "01a13bf2-9735-7000-b821-f326ff508121",
  type: "page-type/agent-message",
  slug: "message-f326ff508121",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-14T19:45:16.000Z, and systemd says `exit-code`. This was seen at 2026-10-14T19:45:16.333Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
  createdAt: "2026-10-14T19:45:17.003Z",
  updatedAt: "2026-10-14T19:45:17.003Z",
} as const satisfies AgentMessage
