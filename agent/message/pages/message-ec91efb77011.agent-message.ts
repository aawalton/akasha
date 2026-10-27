import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageEc91efb77011 = {
  id: "01a17c68-3046-7000-b5e6-ec91efb77011",
  type: "page-type/agent-message",
  slug: "message-ec91efb77011",
  to: "seat/astra",
  from: "alan",
  warrant: "announce",
  body: "Heads-up from alan: about to land a change pointing temper-web at cluster/temper-watcher:711278c2e342 instead of :latest. That tag is the same image digest (sha256:d31d70e9...) the temper pod copies the watcher exe files from today, so the binaries the game machine receives do not change. temper-web will roll once. Nothing else in temper/watcher changes.\n",
  createdAt: "2026-10-27T08:09:25.782Z",
  updatedAt: "2026-10-27T08:09:25.782Z",
} as const satisfies AgentMessage
