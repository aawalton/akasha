import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const undeadHunters = {
  id: "01a0657e-026e-77c6-8996-5a7cc3fbff15",
  type: "page-type/world-class",
  slug: "undead-hunters",
  title: "Undead Hunters",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
