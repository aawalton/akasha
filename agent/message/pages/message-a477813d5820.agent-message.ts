import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA477813d5820 = {
  id: "01a0d5b8-420a-7000-bbcf-a477813d5820",
  type: "page-type/agent-message",
  slug: "message-a477813d5820",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`inbox-tracking-poll` is broken. inbox-tracking-poll.service failed at 2026-09-24T23:20:05.000Z, and systemd says `exit-code`. This was seen at 2026-09-24T23:20:17.199Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u inbox-tracking-poll.service`.\n",
} as const satisfies AgentMessage
