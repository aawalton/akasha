import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message50678eb6aeff = {
  id: "01a19963-4e2c-7347-b93c-50678eb6aeff",
  type: "page-type/agent-message",
  slug: "message-50678eb6aeff",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-11-01T23:12:10.000Z, and systemd says `exit-code`. This was seen at 2026-11-01T23:13:04.235Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
  createdAt: "2026-11-01T23:13:05.177Z",
  updatedAt: "2026-11-01T23:13:05.177Z",
} as const satisfies AgentMessage
