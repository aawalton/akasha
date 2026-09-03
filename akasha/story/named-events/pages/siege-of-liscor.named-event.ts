import type { NamedEvent } from "../named-event.page-type.ts"

export const siegeOfLiscor = {
  id: "019f6865-7788-74c8-8610-64de9551a566",
  pageTypeSlug: "named-event",
  slug: "siege-of-liscor",
  title: "Siege of Liscor",
  aliases: ["siege-liscor", "liscor-siege"],
  evidenceBeat: 35,
  evidenceChapter: "6.29",
  evidenceNote:
    "ruled from sweep evidence 'Since the siege at Liscor' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 19,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
