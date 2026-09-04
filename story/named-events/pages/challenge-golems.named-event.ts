import type { NamedEvent } from "../named-event.page-type.ts"

export const challengeGolems = {
  id: "019f6865-7c61-74a4-82e6-e27251c3bdb5",
  pageTypeSlug: "named-event",
  slug: "challenge-golems",
  title: "Wistram golem challenge",
  aliases: ["wistram-golem-challenge"],
  evidenceBeat: 39,
  evidenceChapter: "Interlude - Wistram Days (Pt. 7)",
  evidenceNote:
    "ruled from sweep evidence 'only two weeks away' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 32,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
