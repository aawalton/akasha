import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellcutWarrior = {
  id: "01a0657e-025d-7db9-8784-58db2ff60f80",
  type: "page-type/world-class",
  slug: "spellcut-warrior",
  title: "Spellcut Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
