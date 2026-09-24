import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEa91666ac254 = {
  id: "01a0d377-a881-7000-8597-ea91666ac254",
  type: "page-type/agent-message",
  slug: "message-ea91666ac254",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`overdue-rolling` is broken. overdue-rolling.service failed at 2026-09-24T12:49:22.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T12:50:03.845Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u overdue-rolling.service`.\n",
} as const satisfies AgentMessage
