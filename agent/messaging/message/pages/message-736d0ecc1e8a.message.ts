import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message736d0ecc1e8a = {
  id: "01a0b9bc-03a8-7000-8924-736d0ecc1e8a",
  type: "page-type/message",
  slug: "message-736d0ecc1e8a",
  to: "seat/amy",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-load-sampler` is broken. workstation-load-sampler.service last said its work landed 2026-09-19T12:26:43.044Z, longer ago than the 180s it may go. This was seen at 2026-09-19T12:55:01.104Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-load-sampler.service`.\n",
} as const satisfies Message
