import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message10899aefff8b = {
  id: "01a0c5e6-a6ef-7000-b34a-10899aefff8b",
  type: "page-type/message",
  slug: "message-10899aefff8b",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-09-21T21:36:45.000Z, and systemd says `exit-code`. This was seen at 2026-09-21T21:37:02.016Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
} as const satisfies Message
