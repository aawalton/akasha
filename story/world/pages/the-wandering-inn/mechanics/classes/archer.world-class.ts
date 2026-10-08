import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archer = {
  id: "01a0657e-132e-7148-aec3-ee811a9dea78",
  type: "page-type/world-class",
  slug: "archer",
  title: "Archer",
  world: "world/the-wandering-inn",
  appearanceCount: 140,
  aliases: ["archers"],
  evolvesToSlugs: ["world-class/sniper"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.398Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
