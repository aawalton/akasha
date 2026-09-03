import type { NamedEvent } from "../named-event.page-type.ts"

export const meetingOfTribes = {
  id: "019f6865-7431-75a7-8824-4ea429c2dbf5",
  pageTypeSlug: "named-event",
  slug: "meeting-of-tribes",
  title: "Meeting of Tribes (the Gnoll gathering)",
  evidenceBeat: 277,
  evidenceChapter: "Interlude - Chess and Ships",
  evidenceNote:
    "ruled from sweep evidence 'Meeting of Tribes' — months-long span event; battle-of-great-plains is its climax (separate entry) (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 11,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
