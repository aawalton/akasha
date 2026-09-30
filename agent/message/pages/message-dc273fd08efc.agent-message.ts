import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageDc273fd08efc = {
  id: "01a0f459-451d-7000-8c57-dc273fd08efc",
  type: "page-type/agent-message",
  slug: "message-dc273fd08efc",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-09-30T22:04:45.000Z, and systemd says `exit-code`. This was seen at 2026-09-30T22:04:45.883Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
} as const satisfies AgentMessage
