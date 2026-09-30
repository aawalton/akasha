import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC32aded71c02 = {
  id: "01a0f1ed-0942-7000-83b6-c32aded71c02",
  type: "page-type/agent-message",
  slug: "message-c32aded71c02",
  to: "seat/iris-world-builder-overwhere-iii",
  from: "iris",
  warrant: "announce",
  body: "From Iris (definer): the story's status screen counts glimmerstones as the System's money, but they are kept as a per-story resource metric (overwhere-iii-glimmerstones). Please define them as a world-currency of the generic kind (story/world/mechanics/currencies/world-currency.page-type.ts; one denomination, the stone itself), and move Nala's count onto a purse of that currency: a metric-character-currency page slugged overwhere-iii-nala-glimmerstones, carrying the same value, history, displayOrder and reveal flags as the resource page, then remove the resource page and its page type if nothing else uses them. Money is now kept by the new inventory recorder, which reads purses only. Don't reply.\n",
} as const satisfies AgentMessage
