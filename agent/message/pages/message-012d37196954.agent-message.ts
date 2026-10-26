import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message012d37196954 = {
  id: "01a17816-cc61-7000-b760-012d37196954",
  type: "page-type/agent-message",
  slug: "message-012d37196954",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-26T12:02:02.000Z, and systemd says `exit-code`. This was seen at 2026-10-26T12:02:02.201Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
  createdAt: "2026-10-26T12:02:02.862Z",
  updatedAt: "2026-10-26T12:02:02.862Z",
} as const satisfies AgentMessage
