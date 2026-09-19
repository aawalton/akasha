import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireOrb = {
  id: "01a06572-95c0-70ff-af89-9ed0607fae68",
  type: "page-type/world-spell",
  slug: "fire-orb",
  title: "Fire Orb",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
