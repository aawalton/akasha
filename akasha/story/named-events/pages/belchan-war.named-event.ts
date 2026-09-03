import type { NamedEvent } from "../named-event.page-type.ts"

export const belchanWar = {
  id: "019f6865-787a-7c3d-8214-91458bf0743b",
  pageTypeSlug: "named-event",
  slug: "belchan-war",
  title: "Belchan war (declaration + broadcast + war)",
  aliases: [
    "belchan-war-broadcast",
    "king-destruction-belchan-broadcast",
    "raelt-declares-war-on-belchan",
  ],
  evidenceBeat: 2,
  evidenceChapter: "Interlude - Dancing and Brawling",
  evidenceNote:
    "ruled from sweep evidence 'Hours into the first proper day' — tightly-linked event series ch401-410 (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 22,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
