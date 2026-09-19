import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const massTeleportation = {
  id: "01a06572-95d2-7c31-92ac-2f29447678a9",
  type: "page-type/world-spell",
  slug: "mass-teleportation",
  title: "Mass Teleportation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
