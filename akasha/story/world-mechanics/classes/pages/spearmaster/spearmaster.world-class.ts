import type { WorldClass } from "../../world-class.page-type.ts"

export const spearmaster = {
  id: "01a06586-0a4f-7b32-b57b-31b4c31d13af",
  pageTypeSlug: "world-class",
  slug: "spearmaster",
  title: "Spearmaster",
  worldSlug: "the-wandering-inn",
  aliases: ["spearmasters"],
  evolvesToSlugs: ["spearmaster-the-spear-of-silence"],
  references: "jsonl",
} as const satisfies WorldClass
