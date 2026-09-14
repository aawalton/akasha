import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageB57bd49b6a94 = {
  id: "01a0a10e-ded6-7000-b59d-b57bd49b6a94",
  type: "message",
  slug: "message-b57bd49b6a94",
  to: "amy",
  from: "service-watching",
  warrant: "announce",
  body: "`monarch-poll` is broken. monarch-poll.service failed at 2026-09-14T17:54:20.000Z, and systemd says `exit-code`. This was seen at 2026-09-14T17:55:01.280Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u monarch-poll.service`.\n",
} as const satisfies Message
