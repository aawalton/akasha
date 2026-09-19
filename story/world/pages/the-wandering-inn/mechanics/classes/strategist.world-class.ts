import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const strategist = {
  id: "01a06586-0a5a-7ce5-93f6-3787e8b90c33",
  type: "page-type/world-class",
  slug: "strategist",
  title: "Strategist",
  world: "world/the-wandering-inn",
  aliases: ["strategists"],
  evolvesToSlugs: ["eleleu-strategos"],
  references: "jsonl",
} as const satisfies WorldClass
