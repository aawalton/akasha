import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message0c8f42387a54 = {
  id: "01a17f2f-c398-77b4-8e4b-0c8f42387a54",
  type: "page-type/agent-message",
  slug: "message-0c8f42387a54",
  to: "seat/iris-game-master-test-story",
  from: "awen",
  warrant: "announce",
  body: "Your role changed: role/game-master now has a part, domain/game-master-checks (agent/role/pages/game-master/checks/game-master-checks.domain.ts), holding Difficulty, Action Difficulty and a new Montage rule. Run `akasha read` (alone on the line, until nothing is left) before your next turn.\n",
  createdAt: "2026-10-27T21:06:39.541Z",
  updatedAt: "2026-10-27T21:06:39.541Z",
} as const satisfies AgentMessage
