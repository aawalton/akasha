import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const twinbladeLinebreaker = {
  id: "01a06586-0a6d-7a8c-8694-2c4ecba950ee",
  type: "page-type/world-class",
  slug: "twinblade-linebreaker",
  title: "Twinblade Linebreaker",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/maimed-twinblade"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.445Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
