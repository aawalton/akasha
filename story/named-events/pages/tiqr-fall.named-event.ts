import type { NamedEvent } from "../named-event.page-type.ts"

export const tiqrFall = {
  id: "019f6865-77be-7f7c-af73-08f45ecc2df6",
  pageTypeSlug: "named-event",
  slug: "tiqr-fall",
  title: "Fall of Tiqr",
  aliases: ["tiqr-surrender"],
  evidenceBeat: 430,
  evidenceChapter: "6.55 K",
  evidenceNote:
    "ruled from sweep evidence 'Tiqr had fallen this morning' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 20,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
