import type { NamedEvent } from "../named-event.page-type.ts"

export const battleOfMedain = {
  id: "019f6865-7ad0-7edd-b2c1-0e46eceffcff",
  pageTypeSlug: "named-event",
  slug: "battle-of-medain",
  title: "Battle at Medain (multi-faction convergence)",
  aliases: [
    "medain-battle",
    "clash-at-medain",
    "king-destruction-medain-battle",
    "medain-jecrass-battle",
    "medain-reim-conflict",
  ],
  evidenceBeat: 73,
  evidenceChapter: "7.48 K",
  evidenceNote: "ruled from sweep evidence 'a day ago' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 28,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
