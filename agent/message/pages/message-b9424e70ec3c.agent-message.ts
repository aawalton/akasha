import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB9424e70ec3c = {
  id: "01a19966-055b-7617-bbd4-b9424e70ec3c",
  type: "page-type/agent-message",
  slug: "message-b9424e70ec3c",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-reading-service` is broken. monarch-reading-service.service failed at 2026-11-01T23:15:06.000Z, and systemd says `exit-code`. This was seen at 2026-11-01T23:16:02.197Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-reading-service.service`.\n",
  createdAt: "2026-11-01T23:16:02.904Z",
  updatedAt: "2026-11-01T23:16:02.904Z",
} as const satisfies AgentMessage
