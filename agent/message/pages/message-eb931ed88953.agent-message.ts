import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEb931ed88953 = {
  id: "01a0d5f8-8d91-7000-b2c7-eb931ed88953",
  type: "page-type/agent-message",
  slug: "message-eb931ed88953",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`temper-addon-deploying` is broken. temper-addon-deploying.service failed at 2026-09-25T00:30:31.000Z, and systemd says `exit-code`. This was seen at 2026-09-25T00:30:31.063Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u temper-addon-deploying.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
