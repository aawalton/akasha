import type { NamedEvent } from "../named-event.page-type.ts"

export const palaceOfFates = {
  id: "019f6865-7df2-78ed-9f40-302e2a959134",
  pageTypeSlug: "named-event",
  slug: "palace-of-fates",
  title: "Palace of Fates incident",
  evidenceBeat: 0,
  evidenceChapter: "Interlude - Vernoue (Pt. 1)",
  evidenceNote:
    "ruled from sweep evidence 'around two weeks after the Palace of Fates incident' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "global-event",
  seq: 36,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
