import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ironBones = {
  id: "01a06572-95cc-7738-9c2a-4c76630b3198",
  type: "page-type/world-spell",
  slug: "iron-bones",
  title: "Iron Bones",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
