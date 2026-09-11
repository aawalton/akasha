import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const bloodbatSwarm = {
  id: "01a06572-95b6-7013-8db0-8ccddedf9496",
  type: "world-spell",
  slug: "bloodbat-swarm",
  title: "Bloodbat Swarm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
