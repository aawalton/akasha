import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voidWall = {
  id: "01a06572-95e8-7e18-a41b-39b411e8e365",
  type: "page-type/world-spell",
  slug: "void-wall",
  title: "Void Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
