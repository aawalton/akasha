import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message85785c88f750 = {
  id: "01a1682b-15a7-7000-bdd3-85785c88f750",
  type: "page-type/agent-message",
  slug: "message-85785c88f750",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-23T09:50:16.000Z, and systemd says `exit-code`. This was seen at 2026-10-23T09:50:16.214Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
  createdAt: "2026-10-23T09:50:16.894Z",
  updatedAt: "2026-10-23T09:50:16.894Z",
} as const satisfies AgentMessage
