import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD9871de4a7d0 = {
  id: "01a16d53-d82f-7000-bfbb-d9871de4a7d0",
  type: "page-type/agent-message",
  slug: "message-d9871de4a7d0",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-24T09:52:53.000Z, and systemd says `exit-code`. This was seen at 2026-10-24T09:52:53.535Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
  createdAt: "2026-10-24T09:52:54.200Z",
  updatedAt: "2026-10-24T09:52:54.200Z",
} as const satisfies AgentMessage
