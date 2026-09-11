import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const spearmaster = {
  id: "01a06586-0a4f-7b32-b57b-31b4c31d13af",
  type: "world-class",
  slug: "spearmaster",
  title: "Spearmaster",
  world: "the-wandering-inn",
  aliases: ["spearmasters"],
  evolvesToSlugs: ["spearmaster-the-spear-of-silence"],
  references: "jsonl",
} as const satisfies WorldClass
