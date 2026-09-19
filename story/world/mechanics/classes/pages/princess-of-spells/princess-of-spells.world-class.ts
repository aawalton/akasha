import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const princessOfSpells = {
  id: "01a06586-0a0e-7d31-bc35-8d18cd802304",
  type: "page-type/world-class",
  slug: "princess-of-spells",
  title: "Princess of Spells",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
