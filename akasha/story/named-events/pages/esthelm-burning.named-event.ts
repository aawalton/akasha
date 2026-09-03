import type { NamedEvent } from "../named-event.page-type.ts"

export const esthelmBurning = {
  id: "019f6865-7d2c-72e2-b6f4-44148c0a5d92",
  pageTypeSlug: "named-event",
  slug: "esthelm-burning",
  title: "Esthelm burned by the Goblin army",
  aliases: ["esthelm-burn"],
  evidenceBeat: 102,
  evidenceChapter: "2.48",
  evidenceNote:
    "ruled from sweep evidence 'A Goblin army just attacked Esthelm and burned it to the ground!' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 34,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
