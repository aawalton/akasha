import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const battleCaster = {
  id: "01a0657e-01b5-7e36-b03f-7ce742ab0e7e",
  type: "page-type/world-class",
  slug: "battle-caster",
  title: "Battle Caster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
