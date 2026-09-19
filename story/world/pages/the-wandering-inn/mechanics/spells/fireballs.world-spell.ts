import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireballs = {
  id: "01a06572-95c2-7ff7-a086-7947ceb8b7bc",
  type: "page-type/world-spell",
  slug: "fireballs",
  title: "Fireballs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
