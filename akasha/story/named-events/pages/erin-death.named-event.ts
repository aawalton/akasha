import type { NamedEvent } from "../named-event.page-type.ts"

export const erinDeath = {
  id: "019f6865-75be-765d-b2f1-c85f26b367b2",
  pageTypeSlug: "named-event",
  slug: "erin-death",
  title: "Erin shot / enters stasis",
  aliases: ["erin-stasis", "erins-death", "erin-frozen"],
  evidenceBeat: 504,
  evidenceChapter: "8.01",
  evidenceNote:
    "ruled from sweep evidence 'shortly after Erin had been hurt' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 14,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
