import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const magicalChef = {
  id: "01a0657e-139b-7a81-badf-71738e2bff8f",
  type: "page-type/world-class",
  slug: "magical-chef",
  title: "Magical Chef",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
} as const satisfies WorldClass
