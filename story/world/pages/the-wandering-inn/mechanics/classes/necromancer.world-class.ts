import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const necromancer = {
  id: "01a0657e-13ab-71e9-83ba-542d4f1b5479",
  type: "page-type/world-class",
  slug: "necromancer",
  title: "Necromancer",
  world: "world/the-wandering-inn",
  aliases: ["necromancers"],
  evolvesToSlugs: ["ossific-necromancer"],
  references: "jsonl",
} as const satisfies WorldClass
