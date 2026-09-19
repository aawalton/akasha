import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const artisanMage = {
  id: "01a0657e-01ac-79dd-950b-2985d21ad090",
  type: "page-type/world-class",
  slug: "artisan-mage",
  title: "Artisan Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
