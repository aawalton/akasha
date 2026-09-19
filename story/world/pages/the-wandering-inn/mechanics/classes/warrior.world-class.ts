import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warrior = {
  id: "01a06586-0a74-7351-a868-3373653c153d",
  type: "page-type/world-class",
  slug: "warrior",
  title: "Warrior",
  world: "world/the-wandering-inn",
  aliases: ["warriors"],
  evolvesToSlugs: ["bannerlady", "berserker", "champion", "general", "weapon-expert"],
  references: "jsonl",
} as const satisfies WorldClass
