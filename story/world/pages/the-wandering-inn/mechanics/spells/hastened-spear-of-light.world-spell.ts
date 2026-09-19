import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hastenedSpearOfLight = {
  id: "01a06572-95c8-724f-a727-25111a24fc14",
  type: "page-type/world-spell",
  slug: "hastened-spear-of-light",
  title: "Hastened Spear of Light",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
