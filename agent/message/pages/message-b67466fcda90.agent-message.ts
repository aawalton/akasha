import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB67466fcda90 = {
  id: "01a0cb03-2ea3-7000-bb5c-b67466fcda90",
  type: "page-type/agent-message",
  slug: "message-b67466fcda90",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`temper-addon-deploying` is broken. temper-addon-deploying.service failed at 2026-09-22T21:26:18.000Z, and systemd says `exit-code`. This was seen at 2026-09-22T21:26:18.308Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u temper-addon-deploying.service`.\n",
} as const satisfies AgentMessage
