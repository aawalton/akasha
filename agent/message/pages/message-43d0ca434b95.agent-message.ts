import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message43d0ca434b95 = {
  id: "01a0f1ca-f5a7-7000-b83f-43d0ca434b95",
  type: "page-type/agent-message",
  slug: "message-43d0ca434b95",
  to: "seat/awen",
  from: "service-watching",
  warrant: "announce",
  body: "`turn-undo-answering` is broken. turn-undo-answering.service is `inactive` rather than running. This was seen at 2026-09-30T10:10:04.813Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u turn-undo-answering.service`.\n",
} as const satisfies AgentMessage
