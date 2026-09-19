import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const flagBearer = {
  id: "01a0657e-1365-7657-9820-893c3dd52d15",
  type: "page-type/world-class",
  slug: "flag-bearer",
  title: "Flag Bearer",
  world: "world/the-wandering-inn",
  aliases: ["flag-bearers"],
  evolvesToSlugs: ["banner-leader"],
  references: "jsonl",
} as const satisfies WorldClass
