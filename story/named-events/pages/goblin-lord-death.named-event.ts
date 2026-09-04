import type { NamedEvent } from "../named-event.page-type.ts"

export const goblinLordDeath = {
  id: "019f6865-793f-7afe-84e1-caeff6885587",
  pageTypeSlug: "named-event",
  slug: "goblin-lord-death",
  title: "Death of the Goblin Lord",
  evidenceBeat: 274,
  evidenceChapter: "6.02",
  evidenceNote:
    "ruled from sweep evidence 'The eighth day after the death of the Goblin Lord' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 24,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
