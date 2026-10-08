import type { NamedEvent } from "akasha/story/world/named-events/named-event.page-type.types.ts"

export const goblinLordDeath = {
  id: "019f6865-793f-7afe-84e1-caeff6885587",
  type: "page-type/named-event",
  slug: "goblin-lord-death",
  title: "Death of the Goblin Lord",
  evidenceBeat: 274,
  evidenceChapter: "6.02",
  evidenceNote:
    "ruled from sweep evidence 'The eighth day after the death of the Goblin Lord' (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 313,
  namedEventKind: "global-event",
  world: "world/the-wandering-inn",
  createdAt: "2026-07-16T00:48:28.479Z",
  updatedAt: "2026-09-22T13:44:58.000Z",
} as const satisfies NamedEvent
