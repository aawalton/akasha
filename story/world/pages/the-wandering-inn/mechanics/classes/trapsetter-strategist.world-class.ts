import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const trapsetterStrategist = {
  id: "01a06586-0a6b-7b37-b80a-0dd69c4106aa",
  type: "page-type/world-class",
  slug: "trapsetter-strategist",
  title: "Trapsetter Strategist",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesToSlugs: ["world-class/combined-arms-strategist"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.443Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
