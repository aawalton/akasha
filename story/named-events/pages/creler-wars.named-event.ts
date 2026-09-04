import type { NamedEvent } from "../named-event.page-type.ts"

export const crelerWars = {
  id: "019f6865-750b-7b57-a971-a089fb51be77",
  pageTypeSlug: "named-event",
  slug: "creler-wars",
  title: "The Creler Wars (historical era)",
  aliases: ["crelers-wars"],
  evidenceBeat: 39,
  evidenceChapter: "Interlude - Another Time",
  evidenceNote:
    "ruled from sweep evidence 'at the height of the Creler Wars' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 13,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
