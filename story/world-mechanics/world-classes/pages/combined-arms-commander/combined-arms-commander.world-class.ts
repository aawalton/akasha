import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const combinedArmsCommander = {
  id: "01a0657e-01c8-71e0-acd5-1cde19c7d66e",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "combined-arms-commander",
  title: "Combined-Arms Commander",
  world: "the-wandering-inn",
  aliases: ["Combined Arms Commander"],
  evolvesFromSlugs: ["foreign-commander"],
  references: "jsonl",
} as const satisfies WorldClass
