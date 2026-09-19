import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const detectAura = {
  id: "01a06572-95bc-7217-8f43-db7994bd599b",
  type: "page-type/world-spell",
  slug: "detect-aura",
  title: "Detect Aura",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
