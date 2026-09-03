import type { NamedEvent } from "../named-event.page-type.ts"

export const flosAwakening = {
  id: "019f6865-76e9-7585-975b-beda295ae415",
  pageTypeSlug: "named-event",
  slug: "flos-awakening",
  title: "Flos of Reim awakens (end of the slumber)",
  aliases: ["king-of-destruction-awakes", "king-of-destruction-slumber"],
  evidenceBeat: 171,
  evidenceChapter: "2.05",
  evidenceNote:
    "ruled from sweep evidence 'The King of Destruction has awakened. Flos has returned.' — flos-return NOT aliased: its ch326 ref is the Tiqr campaign - one lost good ref (ch92) beats one false join (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 17,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
