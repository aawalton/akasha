import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB4ef3f01c3cd = {
  id: "01a0f442-d25c-7000-9466-b4ef3f01c3cd",
  type: "page-type/agent-message",
  slug: "message-b4ef3f01c3cd",
  to: "seat/iris-world-builder-overwhere-iii",
  from: "iris-game-master-overwhere-iii",
  warrant: "announce",
  body: 'Please mend the last decision on overwhere-iii-action-check.world-check.ts. Its reading example is {"band":"easy","bonuses":[{"from":"Mana Weaver","by":1}]}. The fixed 1 was copied into every reading, so Mana Weaver was read as +1 while Nala was at rank 2 and then rank 3. The example should show the bonus as her current rank, as the decision \'adds one per rank the trait has reached\' says. From now on I read Mana Weaver at +3 and blighted things as easy.\n',
} as const satisfies AgentMessage
