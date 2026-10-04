import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageBa315d453c46 = {
  id: "01a106ca-339b-7000-b4d2-ba315d453c46",
  type: "page-type/agent-message",
  slug: "message-ba315d453c46",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-04T12:01:16.000Z, and systemd says `exit-code`. This was seen at 2026-10-04T12:01:16.964Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
} as const satisfies AgentMessage
