import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const zelkyrSEmergencyGolem = {
  id: "01a06572-95ea-7150-8491-3de3aa82baa5",
  type: "page-type/world-spell",
  slug: "zelkyr-s-emergency-golem",
  title: "Zelkyr’s Emergency Golem",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
