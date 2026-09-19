import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranMagicSoldiers = {
  id: "01a06586-0a6f-70fd-9ef8-d3440ab2cc52",
  type: "page-type/world-class",
  slug: "veteran-magic-soldiers",
  title: "Veteran Magic Soldiers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
