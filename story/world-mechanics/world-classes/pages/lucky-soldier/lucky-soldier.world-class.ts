import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const luckySoldier = {
  id: "01a0657e-1391-7c30-a32f-6e1f6c2c6808",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "lucky-soldier",
  title: "Lucky Soldier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
