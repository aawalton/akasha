import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const seekerProjectile = {
  id: "01a06572-95df-72fb-9a58-d480116b8ca4",
  type: "page-type/world-spell",
  slug: "seeker-projectile",
  title: "Seeker Projectile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
