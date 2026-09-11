import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magmaWave = {
  id: "01a06572-95d1-77b5-83ec-8bf5ef1ff378",
  type: "world-spell",
  slug: "magma-wave",
  title: "Magma Wave",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
