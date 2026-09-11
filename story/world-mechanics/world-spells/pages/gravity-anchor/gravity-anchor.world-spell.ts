import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const gravityAnchor = {
  id: "01a06572-95c6-726e-bd8a-398e6b971e9f",
  type: "world-spell",
  slug: "gravity-anchor",
  title: "Gravity Anchor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
