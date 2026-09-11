import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfTeleportation = {
  id: "01a06572-95dc-70e9-8730-bf296e7cc454",
  type: "world-spell",
  slug: "ray-of-teleportation",
  title: "Ray of Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
