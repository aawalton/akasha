import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dirtSpray = {
  id: "01a06572-95bd-7063-a493-604d92d4802e",
  type: "page-type/world-spell",
  slug: "dirt-spray",
  title: "Dirt Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
