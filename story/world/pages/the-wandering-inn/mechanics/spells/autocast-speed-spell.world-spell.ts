import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const autocastSpeedSpell = {
  id: "01a06572-95b5-75f1-a833-5ec254fcf692",
  type: "page-type/world-spell",
  slug: "autocast-speed-spell",
  title: "Autocast: Speed Spell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
