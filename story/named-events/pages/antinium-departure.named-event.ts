import type { NamedEvent } from "../named-event.page-type.ts"

export const antiniumDeparture = {
  id: "019f6865-7a0a-7bb5-96b2-f14e4bdb5eae",
  pageTypeSlug: "named-event",
  slug: "antinium-departure",
  title: "Antinium leave Rhir",
  aliases: ["antinium-left-rhir"],
  evidenceBeat: 21,
  evidenceChapter: "Interlude – The Antinium Wars (Pt.1)",
  evidenceNote:
    "ruled from sweep evidence 'nearly eight months after the Antinium left Rhir' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 26,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
