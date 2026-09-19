import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crusader = {
  id: "01a0657e-1350-707d-b761-3bcf4bd942cf",
  type: "page-type/world-class",
  slug: "crusader",
  title: "Crusader",
  world: "world/the-wandering-inn",
  aliases: ["CruSAdeR", "crusaders"],
  evolvesToSlugs: ["templar"],
  references: "jsonl",
} as const satisfies WorldClass
