import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const viceInnkeeperOfSpells = {
  id: "01a06586-0a6f-7d47-8688-6f29f8736e29",
  type: "page-type/world-class",
  slug: "vice-innkeeper-of-spells",
  title: "Vice Innkeeper of Spells",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesToSlugs: ["world-class/innkeeper-of-the-magical-frontier"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.447Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
