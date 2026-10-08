import type { NamedEvent } from "akasha/story/world/named-events/named-event.page-type.types.ts"

export const tiqrFall = {
  id: "019f6865-77be-7f7c-af73-08f45ecc2df6",
  type: "page-type/named-event",
  slug: "tiqr-fall",
  title: "Fall of Tiqr",
  aliases: ["tiqr-surrender"],
  evidenceBeat: 430,
  evidenceChapter: "6.55 K",
  evidenceNote:
    "ruled from sweep evidence 'Tiqr had fallen this morning' (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 371,
  namedEventKind: "battle",
  world: "world/the-wandering-inn",
  createdAt: "2026-07-16T00:48:28.094Z",
  updatedAt: "2026-09-22T13:44:58.000Z",
} as const satisfies NamedEvent
