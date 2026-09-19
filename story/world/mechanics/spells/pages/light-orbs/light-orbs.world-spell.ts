import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightOrbs = {
  id: "01a06572-95ce-7a80-af4a-55dd6d193b2b",
  type: "page-type/world-spell",
  slug: "light-orbs",
  title: "Light Orbs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
