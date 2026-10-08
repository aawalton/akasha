import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightOfTheDawn = {
  id: "01a0657e-137d-746a-abc0-ca39696cacf1",
  type: "page-type/world-class",
  slug: "knight-of-the-dawn",
  title: "Knight of the Dawn",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  evolvesFromSlugs: ["world-class/aura-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.477Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
