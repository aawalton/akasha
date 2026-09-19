import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthWall = {
  id: "01a06572-95be-75f5-9fa1-0e2a4988808a",
  type: "page-type/world-spell",
  slug: "earth-wall",
  title: "Earth Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
