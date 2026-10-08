import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pitfallTrapmasterSaboteur = {
  id: "01a0657e-023d-7c2e-afe0-f935fdfcfabf",
  type: "page-type/world-class",
  slug: "pitfall-trapmaster-saboteur",
  title: "Pitfall Trapmaster Saboteur",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/trap-rogue"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.061Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
