import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const thornArmor = {
  id: "01a06572-95e6-7762-a6e8-1c3cfe71eb2a",
  type: "page-type/world-spell",
  slug: "thorn-armor",
  title: "Thorn Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
