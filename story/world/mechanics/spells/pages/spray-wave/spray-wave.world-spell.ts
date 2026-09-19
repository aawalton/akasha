import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sprayWave = {
  id: "01a06572-95e2-7fc9-a38d-77f80bdcf18c",
  type: "page-type/world-spell",
  slug: "spray-wave",
  title: "Spray Wave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
