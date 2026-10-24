import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD0db7b467c59 = {
  id: "01a16ed1-5a59-7000-a0e3-d0db7b467c59",
  type: "page-type/agent-message",
  slug: "message-d0db7b467c59",
  to: "seat/alan",
  from: "service-watching",
  warrant: "announce",
  body: "`dcgm-exporter` is broken. dcgm-exporter.service last ended badly at 2026-10-24T16:49:35.000Z, and systemd says `exit-code`. This was seen at 2026-10-24T16:49:36.071Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u dcgm-exporter.service`. This was meant for `aranya`, whom nothing could reach: no seat holds the name `aranya`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
  createdAt: "2026-10-24T16:49:36.784Z",
  updatedAt: "2026-10-24T16:49:36.784Z",
} as const satisfies AgentMessage
