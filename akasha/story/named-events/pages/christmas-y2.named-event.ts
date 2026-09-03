import type { NamedEvent } from "../named-event.page-type.ts"

export const christmasY2 = {
  id: "019f6865-72a0-73d2-bbbe-52132802a759",
  pageTypeSlug: "named-event",
  slug: "christmas-y2",
  title: "Christmas (second observed)",
  aliases: ["christmas"],
  evidenceBeat: 285,
  evidenceChapter: "10.27 GMG",
  evidenceNote:
    "ruled from sweep evidence 'just after Christmas' (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 620,
  namedEventKind: "festival",
  lastChapter: 750,
  seq: 8,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
