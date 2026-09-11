import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const iceArmor = {
  id: "01a06572-95c9-7926-810d-12c55f7ccbe3",
  type: "world-spell",
  slug: "ice-armor",
  title: "Ice Armor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
