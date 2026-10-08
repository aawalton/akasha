import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const fireMage = {
  id: "01a0657e-1364-7400-b0b9-d698ab894aec",
  type: "page-type/world-class",
  slug: "fire-mage",
  title: "Fire Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesToSlugs: ["world-class/inferno-mage"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.452Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
