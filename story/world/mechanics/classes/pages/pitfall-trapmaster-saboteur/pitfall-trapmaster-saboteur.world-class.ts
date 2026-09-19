import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const pitfallTrapmasterSaboteur = {
  id: "01a0657e-023d-7c2e-afe0-f935fdfcfabf",
  type: "page-type/world-class",
  slug: "pitfall-trapmaster-saboteur",
  title: "Pitfall Trapmaster Saboteur",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["trap-rogue"],
  references: "jsonl",
} as const satisfies WorldClass
