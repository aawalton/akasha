import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const knightOfHonorSEmber = {
  id: "01a0657e-137d-70f8-a27c-9ffe2647646f",
  type: "page-type/world-class",
  slug: "knight-of-honor-s-ember",
  title: "Knight of Honor’s Ember",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/courteous-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.477Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
