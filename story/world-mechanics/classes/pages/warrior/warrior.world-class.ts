import type { WorldClass } from "../../world-class.page-type.ts"

export const warrior = {
  id: "01a06586-0a74-7351-a868-3373653c153d",
  pageTypeSlug: "world-class",
  slug: "warrior",
  title: "Warrior",
  worldSlug: "the-wandering-inn",
  aliases: ["warriors"],
  evolvesToSlugs: ["bannerlady", "berserker", "champion", "general", "weapon-expert"],
  references: "jsonl",
} as const satisfies WorldClass
