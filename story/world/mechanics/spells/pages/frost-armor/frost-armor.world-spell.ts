import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const frostArmor = {
  id: "01a06572-95c5-7305-8b9c-38a0b799e409",
  type: "page-type/world-spell",
  slug: "frost-armor",
  title: "Frost Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
