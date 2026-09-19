import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const soulSummoningShaman = {
  id: "01a06586-0a4d-7fb8-8643-f90ac9d49ace",
  type: "page-type/world-class",
  slug: "soul-summoning-shaman",
  title: "Soul Summoning Shaman",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
