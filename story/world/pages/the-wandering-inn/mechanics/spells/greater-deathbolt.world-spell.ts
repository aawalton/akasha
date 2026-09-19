import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterDeathbolt = {
  id: "01a06572-95c7-73a7-ac81-f1c31ff476db",
  type: "page-type/world-spell",
  slug: "greater-deathbolt",
  title: "Greater Deathbolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
