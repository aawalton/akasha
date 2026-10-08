import type { NamedEvent } from "akasha/story/world/named-events/named-event.page-type.types.ts"

export const siegeOfLiscor = {
  id: "019f6865-7788-74c8-8610-64de9551a566",
  type: "page-type/named-event",
  slug: "siege-of-liscor",
  title: "Siege of Liscor",
  aliases: ["siege-liscor", "liscor-siege"],
  evidenceBeat: 35,
  evidenceChapter: "6.29",
  evidenceNote:
    "ruled from sweep evidence 'Since the siege at Liscor' (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 340,
  namedEventKind: "battle",
  world: "world/the-wandering-inn",
  createdAt: "2026-07-16T00:48:28.040Z",
  updatedAt: "2026-09-22T13:44:58.000Z",
} as const satisfies NamedEvent
