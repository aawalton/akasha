import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kicker = {
  id: "01a0657e-1378-708c-b7af-d881aeb5c2b4",
  type: "page-type/world-class",
  slug: "kicker",
  title: "Kicker",
  world: "world/the-wandering-inn",
  aliases: ["kickers"],
  evolvesToSlugs: ["football-player"],
  references: "jsonl",
} as const satisfies WorldClass
