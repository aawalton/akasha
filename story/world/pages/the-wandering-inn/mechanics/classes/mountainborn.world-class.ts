import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mountainborn = {
  id: "01a0657e-13a3-7b54-a685-83960277f051",
  type: "page-type/world-class",
  slug: "mountainborn",
  title: "Mountainborn",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
