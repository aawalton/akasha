import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spearmaster = {
  id: "01a06586-0a4f-7b32-b57b-31b4c31d13af",
  type: "page-type/world-class",
  slug: "spearmaster",
  title: "Spearmaster",
  world: "world/the-wandering-inn",
  appearanceCount: 105,
  aliases: ["spearmasters"],
  evolvesToSlugs: ["world-class/spearmaster-the-spear-of-silence"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.415Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
