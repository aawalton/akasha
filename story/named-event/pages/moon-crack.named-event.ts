import type { NamedEvent } from "akasha/story/named-event/named-event.page-type.types.ts"

export const moonCrack = {
  id: "019f6865-7d8c-7b17-bcfa-1a32ca81855b",
  type: "page-type/named-event",
  slug: "moon-crack",
  title: "One of the moons cracks",
  evidenceBeat: 513,
  evidenceChapter: "Interlude – Halfseekers (Pt. 9)",
  evidenceNote:
    "ruled from sweep evidence 'since the moon cracked' — before/after refs cleanly bracket ch791-816 (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  world: "world/the-wandering-inn",
} as const satisfies NamedEvent
