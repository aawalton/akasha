import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const witch = {
  id: "01a06586-0a7d-76d0-b07c-2a2e02b9565c",
  type: "page-type/world-class",
  slug: "witch",
  title: "Witch",
  world: "world/the-wandering-inn",
  aliases: ["WITCH"],
  evolvesToSlugs: ["witch-of-second-chances"],
  references: "jsonl",
} as const satisfies WorldClass
