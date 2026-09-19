import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bloodLightning = {
  id: "01a06572-95b6-755d-9ba7-d97e7d6f0810",
  type: "page-type/world-spell",
  slug: "blood-lightning",
  title: "Blood Lightning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
