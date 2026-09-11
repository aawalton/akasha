import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonGreaterEarthElemental = {
  id: "01a06572-95e4-7619-ae83-e563f84ea807",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "summon-greater-earth-elemental",
  title: "Summon Greater Earth Elemental",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
