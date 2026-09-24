import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message38cde2e6e7d2 = {
  id: "01a0d376-b059-7000-95eb-38cde2e6e7d2",
  type: "page-type/agent-message",
  slug: "message-38cde2e6e7d2",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-load-sampler` is broken. workstation-load-sampler.service last said its work landed 2026-09-23T16:36:02.781Z, longer ago than the 180s it may go. This was seen at 2026-09-24T12:49:16.080Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-load-sampler.service`.\n",
} as const satisfies AgentMessage
