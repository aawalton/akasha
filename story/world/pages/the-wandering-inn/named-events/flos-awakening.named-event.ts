import type { NamedEvent } from "akasha/story/world/named-events/named-event.page-type.types.ts"

export const flosAwakening = {
  id: "019f6865-76e9-7585-975b-beda295ae415",
  type: "page-type/named-event",
  slug: "flos-awakening",
  title: "Flos of Reim awakens (end of the slumber)",
  aliases: ["king-of-destruction-awakes", "king-of-destruction-slumber"],
  evidenceBeat: 171,
  evidenceChapter: "2.05",
  evidenceNote:
    "ruled from sweep evidence 'The King of Destruction has awakened. Flos has returned.' — flos-return NOT aliased: its ch326 ref is the Tiqr campaign - one lost good ref (ch92) beats one false join (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 73,
  namedEventKind: "global-event",
  world: "world/the-wandering-inn",
  createdAt: "2026-07-16T00:48:27.881Z",
  updatedAt: "2026-09-22T13:44:58.000Z",
} as const satisfies NamedEvent
