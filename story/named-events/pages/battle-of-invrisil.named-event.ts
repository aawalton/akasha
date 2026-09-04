import type { NamedEvent } from "../named-event.page-type.ts"

export const battleOfInvrisil = {
  id: "019f6865-7492-7023-a96e-3cceec435d1a",
  pageTypeSlug: "named-event",
  slug: "battle-of-invrisil",
  title: "Battle of Invrisil (Zel Shivertail falls)",
  aliases: ["battle-invrisil", "invrisil-battle", "zel-shivertail-death"],
  evidenceBeat: 23,
  evidenceChapter: "5.00",
  evidenceNote:
    "ruled from sweep evidence 'It had been three days since the battle at Invrisil' — Zel died at this battle - same-day merge is evidence-backed (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 12,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
