import type { NamedEvent } from "../named-event.page-type.ts"

export const goblinKingReturn = {
  id: "019f6865-79a6-7058-88bd-e4b832a0266e",
  pageTypeSlug: "named-event",
  slug: "goblin-king-return",
  title: "Return of the Goblin King",
  aliases: ["goblin-king", "goblin-king-incident"],
  evidenceBeat: 196,
  evidenceChapter: "10.37 GDI (Pt. 2)",
  evidenceNote:
    "ruled from sweep evidence 'after the return of the Goblin King' — NOT Velan (velan-death is separate) - evidence says return of (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 25,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
