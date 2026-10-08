import type { NamedEvent } from "akasha/story/world/named-events/named-event.page-type.types.ts"

export const skinnerDeath = {
  id: "019f6865-774e-7ad2-863b-22c66a5826f0",
  type: "page-type/named-event",
  slug: "skinner-death",
  title: "Skinner dies (Liscor crypt disaster)",
  aliases: ["skinner", "funeral-pyres"],
  evidenceBeat: 15,
  evidenceChapter: "1.63",
  evidenceNote:
    "ruled from sweep evidence 'the day after Skinner died' (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 66,
  namedEventKind: "global-event",
  world: "world/the-wandering-inn",
  createdAt: "2026-07-16T00:48:27.982Z",
  updatedAt: "2026-09-22T13:44:58.000Z",
} as const satisfies NamedEvent
