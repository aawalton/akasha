import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const eliteSkirmishers = {
  id: "01a0657e-01d6-7901-af2c-e1f8337f81d5",
  type: "page-type/world-class",
  slug: "elite-skirmishers",
  title: "Elite Skirmishers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
