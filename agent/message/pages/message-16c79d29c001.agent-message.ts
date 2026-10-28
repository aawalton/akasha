import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message16c79d29c001 = {
  id: "01a18264-7b0c-7587-8810-16c79d29c001",
  type: "page-type/agent-message",
  slug: "message-16c79d29c001",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-28T12:03:05.000Z, and systemd says `exit-code`. This was seen at 2026-10-28T12:03:05.296Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
  createdAt: "2026-10-28T12:03:06.758Z",
  updatedAt: "2026-10-28T12:03:06.758Z",
} as const satisfies AgentMessage
