import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const orbOfAir = {
  id: "01a06572-95da-7e01-8fa7-39c2986de711",
  type: "page-type/world-spell",
  slug: "orb-of-air",
  title: "Orb of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
