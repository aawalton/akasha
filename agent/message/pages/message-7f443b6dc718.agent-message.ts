import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7f443b6dc718 = {
  id: "01a18264-7ab7-7621-8682-7f443b6dc718",
  type: "page-type/agent-message",
  slug: "message-7f443b6dc718",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-28T12:03:05.000Z, and systemd says `exit-code`. This was seen at 2026-10-28T12:03:05.297Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
  createdAt: "2026-10-28T12:03:05.945Z",
  updatedAt: "2026-10-28T12:03:05.945Z",
} as const satisfies AgentMessage
