import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const auraKnight = {
  id: "01a0657e-01ae-76b7-87bc-211cae4b891f",
  type: "page-type/world-class",
  slug: "aura-knight",
  title: "Aura Knight",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/knight-errant"],
  evolvesToSlugs: ["world-class/knight-of-the-dawn"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.918Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
