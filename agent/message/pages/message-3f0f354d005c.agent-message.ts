import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3f0f354d005c = {
  id: "01a0d904-1d72-7000-a176-3f0f354d005c",
  type: "page-type/agent-message",
  slug: "message-3f0f354d005c",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`orphaned-resources-sweep` is broken. orphaned-resources-sweep.service failed at 2026-09-25T14:42:00.000Z, and systemd says `exit-code`. This was seen at 2026-09-25T14:42:00.413Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u orphaned-resources-sweep.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
