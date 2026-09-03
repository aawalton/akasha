import type { NamedEvent } from "../named-event.page-type.ts"

export const bloodfeastRaid = {
  id: "019f6865-7bff-721a-a1e4-855388e7736a",
  pageTypeSlug: "named-event",
  slug: "bloodfeast-raid",
  title: "Bloodfeast Raiders attack (Izril north)",
  aliases: ["bloodfeast-raiders"],
  evidenceBeat: 17,
  evidenceChapter: "Interlude - A Meeting of [Druids]",
  evidenceNote:
    "ruled from sweep evidence 'After the Bloodfeast Raiders attack' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 31,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
