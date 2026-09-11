import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createObjectMugOfExplosions = {
  id: "01a06572-95bb-72a3-a907-6ed3bd277bdc",
  type: "world-spell",
  slug: "create-object-mug-of-explosions",
  title: "Create Object: Mug of Explosions",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
