import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message790b23c62300 = {
  id: "01a10102-89ba-7000-9d97-790b23c62300",
  type: "page-type/agent-message",
  slug: "message-790b23c62300",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-10-03T09:05:05.000Z, and systemd says `exit-code`. This was seen at 2026-10-03T09:05:05.715Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
} as const satisfies AgentMessage
