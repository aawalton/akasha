import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message676a516a861a = {
  id: "01a0edb1-dd9b-7000-a9db-676a516a861a",
  type: "page-type/agent-message",
  slug: "message-676a516a861a",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-09-29T15:04:11.000Z, and systemd says `exit-code`. This was seen at 2026-09-29T15:04:11.669Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
} as const satisfies AgentMessage
