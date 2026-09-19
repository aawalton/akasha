import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicalArrow = {
  id: "01a06572-95d1-733c-8f1b-81cbc77938ff",
  type: "page-type/world-spell",
  slug: "magical-arrow",
  title: "Magical Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
