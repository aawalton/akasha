import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const summonGreaterEarthElemental = {
  id: "01a06572-95e4-7619-ae83-e563f84ea807",
  type: "page-type/world-spell",
  slug: "summon-greater-earth-elemental",
  title: "Summon Greater Earth Elemental",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
