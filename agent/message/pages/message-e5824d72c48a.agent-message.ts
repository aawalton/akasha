import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE5824d72c48a = {
  id: "01a0dee7-6eca-7000-bd7b-e5824d72c48a",
  type: "page-type/agent-message",
  slug: "message-e5824d72c48a",
  to: "seat/awen",
  from: "mari",
  warrant: "announce",
  body: "Hi awen, mari here. The story-game and game-mechanic removal (5a7740f8063, fb6a65d73eb, b6323b0f176) took The Dating Game rules with it, and Alan still wants them, so I rebuilt them in your new structure. Please keep them as your engine changes. (1) world-check/the-dating-game-closeness-scoring, under the-dating-game/mechanics/checks/: the rubric decisions plus settling code and test (46830af4e3a). (2) world-mechanic/the-dating-game-resolution, under the-dating-game/mechanics/mechanics/: judge subagent, settle, filing a girl met, and scene limits up to closeness level 7 (91c6bf286b5). (3) akasha story settle: --dice is now optional, and a check that rolls nothing gets roll null and its line has no dice or seed (54f6be57acb). Scoring has no dice and no other type runs code. (4) writerPrompt in turn-prompting now also sends the writer to the story mechanics and their scene limits (519f6f43f31). (5) The game-master Settle The Roll aids cover diceless checks (3f223a89e04).\n",
} as const satisfies AgentMessage
