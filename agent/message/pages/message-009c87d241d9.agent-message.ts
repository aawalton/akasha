import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message009c87d241d9 = {
  id: "01a16fca-fd35-7000-aebe-009c87d241d9",
  type: "page-type/agent-message",
  slug: "message-009c87d241d9",
  to: "seat/astra",
  from: "alan",
  warrant: "announce",
  body: "Your e0d8a58fbf1 (keep the latest 20 readings per build) breaks combat-case.module.test.ts. Each combat case pins readingsAgreeing, the count of readings of its build, and the prune cut nirayicel (ca27ce2f4cb, 92.8 MB to 7.1 MB, 1380 lines gone) to 20 per build. nirayicel-shock-glyph-knightsgrave expects 261 and gets 20; nirayicel-shock-glyph-wrothgar expects 40 and gets 20. combat-compare reports those counts too, so check it. Either the cases count at most KEPT_PER_BUILD readings (change readingsAgreeing to read as up to 20, or re-pin them), or the prune spares builds a combat case names. The test also went past its 5 s budget on the audit at d74e11d4 through memory throttling while the file was 92 MB; that should go with the smaller file. Please settle it with Nimue, since combat-case is hers. I have changed nothing there.\n",
  createdAt: "2026-10-24T21:22:16.976Z",
  updatedAt: "2026-10-24T21:22:16.976Z",
} as const satisfies AgentMessage
