import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const infectionHealer = {
  id: "01a0657e-01fb-7e75-b87b-1f0dbeaf660c",
  type: "page-type/world-class",
  slug: "infection-healer",
  title: "Infection Healer",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.995Z",
  updatedAt: "2026-09-22T13:29:20.000Z",
} as const satisfies WorldClass
