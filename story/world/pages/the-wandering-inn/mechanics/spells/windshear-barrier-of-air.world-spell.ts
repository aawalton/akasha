import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windshearBarrierOfAir = {
  id: "01a06572-95ea-7472-a883-aff9fb4e8838",
  type: "page-type/world-spell",
  slug: "windshear-barrier-of-air",
  title: "Windshear Barrier of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
