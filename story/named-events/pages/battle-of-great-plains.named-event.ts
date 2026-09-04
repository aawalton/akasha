import type { NamedEvent } from "../named-event.page-type.ts"

export const battleOfGreatPlains = {
  id: "019f6865-7b36-7c9c-a820-2202a7ad33a6",
  pageTypeSlug: "named-event",
  slug: "battle-of-great-plains",
  title: "Battle of the Great Plains of Izril",
  aliases: ["battle-great-plains", "great-plains-battle"],
  evidenceBeat: 17,
  evidenceChapter: "9.00",
  evidenceNote:
    "ruled from sweep evidence 'Nine days after the events at the Great Plains of Izril' — climax of the Meeting of Tribes (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 29,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
