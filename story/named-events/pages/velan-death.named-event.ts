import type { NamedEvent } from "../named-event.page-type.ts"

export const velanDeath = {
  id: "019f6865-700b-7525-afe5-428a653ca95b",
  pageTypeSlug: "named-event",
  slug: "velan-death",
  title: "Death of Velan the Kind, the Goblin King",
  aliases: ["goblin-king-death"],
  evidenceBeat: 949,
  evidenceChapter: "Interlude - Levels",
  evidenceNote:
    "asserted 'That had been just a decade ago' + beat 1008 'From that day on, she had become legend. … Velan had hesitated' — unique historical moment; ch650's before+after pair is extractor direction-noise, both mean chapter-after-event (rhia-ruled 2026-07-15)",
  namedEventKind: "global-event",
  seq: 3,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
