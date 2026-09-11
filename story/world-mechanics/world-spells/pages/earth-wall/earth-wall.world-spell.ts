import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthWall = {
  id: "01a06572-95be-75f5-9fa1-0e2a4988808a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earth-wall",
  title: "Earth Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
