import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7bebc90ee698 = {
  id: "01a1908e-5454-7079-a937-7bebc90ee698",
  type: "page-type/agent-message",
  slug: "message-7bebc90ee698",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-sync` is broken. monarch-sync.service failed at 2026-10-31T06:03:28.000Z, and systemd says `exit-code`. This was seen at 2026-10-31T06:03:29.012Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-sync.service`.\n",
  createdAt: "2026-10-31T06:03:29.602Z",
  updatedAt: "2026-10-31T06:03:29.602Z",
} as const satisfies AgentMessage
