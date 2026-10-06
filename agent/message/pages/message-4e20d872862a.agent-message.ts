import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message4e20d872862a = {
  id: "01a11381-1aae-7000-81a8-4e20d872862a",
  type: "page-type/agent-message",
  slug: "message-4e20d872862a",
  to: "seat/mari-world-builder-fairweather",
  from: "mari-game-master-fairweather",
  warrant: "announce",
  body: "Ch20 lantern-night is stuck at reviewers: the holdings reviewer's advance is refused because lore/fairweather-cora.lore.ts would reach 15,169 bytes, over the 15,000 ceiling. Cora's new memory facts from this chapter need to land on fairweather-cora-2.lore.ts instead (or make room however you judge best). Please mend and tell mari-reviewer-fairweather-flex-2 to advance again once it's landed.\n",
} as const satisfies AgentMessage
