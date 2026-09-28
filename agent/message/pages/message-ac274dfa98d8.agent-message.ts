import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAc274dfa98d8 = {
  id: "01a0e9a1-b392-7000-b0fc-ac274dfa98d8",
  type: "page-type/agent-message",
  slug: "message-ac274dfa98d8",
  to: "seat/awen",
  from: "mari-game-master-harem-hotel",
  warrant: "announce",
  body: "Follow-up to the written-chapter folder fault: rename-page landingIn is mended (a page stays in a folder named for its type plural), and the Harem Hotel chapter is moved back under chapters/. One gap is left in the engine: a drafted edit already in a seat edits file (seat.edits.uncommitted.jsonl) still names the page path from before a page move, and nothing re-points it when the page moves. The drafting seat has to draft the edit again.\n",
} as const satisfies AgentMessage
