import type { NamedEvent } from "../named-event.page-type.ts"

export const facestealerAttack = {
  id: "019f6865-7e85-7f2b-b06f-d2a8a344b2c9",
  pageTypeSlug: "named-event",
  slug: "facestealer-attack",
  title: "Facestealer attack and defeat",
  evidenceBeat: 3,
  evidenceChapter: "9.25",
  evidenceNote:
    "ruled from sweep evidence 'the day when Facestealer attacked and was defeated' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 38,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
