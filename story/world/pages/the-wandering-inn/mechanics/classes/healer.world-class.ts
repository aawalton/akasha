import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const healer = {
  id: "01a0657e-01f6-7f07-8177-76aa311e62d7",
  type: "page-type/world-class",
  slug: "healer",
  title: "Healer",
  world: "world/the-wandering-inn",
  aliases: ["healers"],
  evolvesToSlugs: ["headstrong-healer"],
  references: "jsonl",
} as const satisfies WorldClass
