import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message891d80546948 = {
  id: "01a0eb56-0533-7000-a969-891d80546948",
  type: "page-type/agent-message",
  slug: "message-891d80546948",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-viii",
  warrant: "announce",
  body: 'Possible engine fault, story-played/otherwhere-viii (no story facts). Turn otherwhere-viii-00-013 arrived with its action cut off mid-word: `action: "“No, I just made it in to the city today. Wha"`, 44 characters, ending on "Wha" with no closing quote. The action property allows 4000 characters, so something between Alan\'s action bar and the turn page seems to have clipped it, or sent it early. I am holding the turn and asking Alan for the rest rather than guessing it.\n',
} as const satisfies AgentMessage
