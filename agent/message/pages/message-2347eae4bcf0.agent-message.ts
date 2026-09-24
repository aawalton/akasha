import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2347eae4bcf0 = {
  id: "01a0d46b-eda1-7000-8480-2347eae4bcf0",
  type: "page-type/agent-message",
  slug: "message-2347eae4bcf0",
  to: "seat/aranya",
  from: "service-watching",
  warrant: "announce",
  body: "`cluster-deploying` is broken. cluster-deploying.service failed, and systemd had started it again by the time this read it. This was seen at 2026-09-24T17:17:17.823Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u cluster-deploying.service`.\n",
} as const satisfies AgentMessage
