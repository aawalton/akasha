import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const heatvision = {
  id: "01a06572-95c8-7554-8dac-1a563ac16e64",
  type: "page-type/world-spell",
  slug: "heatvision",
  title: "Heatvision",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
