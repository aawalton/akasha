import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createGlassBottle = {
  id: "01a06572-95bb-7333-83a0-afda29173882",
  type: "page-type/world-spell",
  slug: "create-glass-bottle",
  title: "Create Glass Bottle",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
