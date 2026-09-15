import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const knight = {
  id: "01a0657e-0217-7df5-a25a-89552eeb0058",
  type: "page-type/world-class",
  slug: "knight",
  title: "Knight",
  world: "world/the-wandering-inn",
  aliases: ["knights"],
  evolvesToSlugs: ["knight-seeker-of-the-silver-dragon"],
  references: "jsonl",
} as const satisfies WorldClass
