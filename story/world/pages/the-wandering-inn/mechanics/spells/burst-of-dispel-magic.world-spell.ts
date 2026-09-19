import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const burstOfDispelMagic = {
  id: "01a06572-95b8-7d00-bdee-e97662cd54bd",
  type: "page-type/world-spell",
  slug: "burst-of-dispel-magic",
  title: "Burst of Dispel Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
