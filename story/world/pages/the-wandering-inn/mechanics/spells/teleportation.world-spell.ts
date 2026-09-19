import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const teleportation = {
  id: "01a06572-95e6-7daa-8bca-3456adf781f0",
  type: "page-type/world-spell",
  slug: "teleportation",
  title: "Teleportation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
