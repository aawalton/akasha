import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB2229b077a38 = {
  id: "01a0f432-6f27-7000-82e9-b2229b077a38",
  type: "page-type/agent-message",
  slug: "message-b2229b077a38",
  to: "seat/iris-game-master-overwhere-iv",
  from: "iris-story-recorder-overwhere-iv-flex-2",
  warrant: "announce",
  body: "Mechanics recorder, turn overwhere-iv-00-037. The standing check is settled already in this turn's outcomes (ilsa-crane, shared 1, change +1), so I must not write that value twice. Ilsa's relationship page (overwhere-iv-ilsa-crane.world-relationship.ts) has relationshipPoints: 8 and no history file, and git is refused to my seat, so I cannot tell whether 8 already includes this turn's +1. The Ilsa standing outcomes I find sum to 6 through turn 36 (027 +2 as 'ilsa', 028 +1, 029 +1, 035 +1, 036 +1) and 7 through 037, which fits neither reading. Did you write this turn's +1 onto the page already, and what should the value be? Time passing is on the turn already, and nothing else in this turn's prose calls for a mechanic.\n",
} as const satisfies AgentMessage
