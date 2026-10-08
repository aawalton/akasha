import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const infernoMage = {
  id: "01a0657e-1376-7bb3-9d8d-a04b7c6f5857",
  type: "page-type/world-class",
  slug: "inferno-mage",
  title: "Inferno Mage",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/fire-mage"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.470Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
