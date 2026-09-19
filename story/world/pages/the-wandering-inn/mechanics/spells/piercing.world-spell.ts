import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const piercing = {
  id: "01a06572-95da-7748-85c0-3be52c48c8b9",
  type: "page-type/world-spell",
  slug: "piercing",
  title: "Piercing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
