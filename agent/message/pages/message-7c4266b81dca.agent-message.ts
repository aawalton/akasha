import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7c4266b81dca = {
  id: "01a0cb0d-9060-7000-af53-7c4266b81dca",
  type: "page-type/agent-message",
  slug: "message-7c4266b81dca",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-deploying` is broken. workstation-deploying.service failed at 2026-09-22T21:37:38.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T21:37:38.686Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-deploying.service`.\n",
} as const satisfies AgentMessage
