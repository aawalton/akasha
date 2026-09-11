import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const summonAlliesExtremeRange = {
  id: "01a06572-95e4-7f97-9744-f0234a59388b",
  type: "world-spell",
  slug: "summon-allies-extreme-range",
  title: "Summon Allies: Extreme Range",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
