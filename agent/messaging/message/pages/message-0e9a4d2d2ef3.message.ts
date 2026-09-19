import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message0e9a4d2d2ef3 = {
  id: "01a0b9ce-5a11-7000-9811-0e9a4d2d2ef3",
  type: "page-type/message",
  slug: "message-0e9a4d2d2ef3",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`workstation-load-sampler` is broken. workstation-load-sampler.service last said its work landed 2026-09-19T13:10:40.513Z, longer ago than the 180s it may go. This was seen at 2026-09-19T13:15:02.876Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u workstation-load-sampler.service`. This was meant for `amy`, whom nothing could reach: no seat holds the name `amy`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies Message
