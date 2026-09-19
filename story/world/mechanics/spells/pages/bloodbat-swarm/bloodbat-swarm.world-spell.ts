import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bloodbatSwarm = {
  id: "01a06572-95b6-7013-8db0-8ccddedf9496",
  type: "page-type/world-spell",
  slug: "bloodbat-swarm",
  title: "Bloodbat Swarm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
