import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const infectionHealer = {
  id: "01a0657e-01fb-7e75-b87b-1f0dbeaf660c",
  type: "page-type/world-class",
  slug: "infection-healer",
  title: "Infection Healer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
