import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message646b7c740dce = {
  id: "01a17d3d-336a-7000-88f8-646b7c740dce",
  type: "page-type/agent-message",
  slug: "message-646b7c740dce",
  to: "seat/elin",
  from: "service-watching",
  warrant: "announce",
  body: "`royal-road-sync` is broken. royal-road-sync.service failed at 2026-10-27T12:00:21.000Z, and systemd says `exit-code`. This was seen at 2026-10-27T12:02:04.945Z. What that service is and what it runs are on its page. Its log is `journalctl --user -u royal-road-sync.service`.\n",
  createdAt: "2026-10-27T12:02:05.715Z",
  updatedAt: "2026-10-27T12:02:05.715Z",
} as const satisfies AgentMessage
