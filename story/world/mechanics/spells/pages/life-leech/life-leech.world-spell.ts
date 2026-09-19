import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lifeLeech = {
  id: "01a06572-95cd-7e00-b0dd-cd06086a0c44",
  type: "page-type/world-spell",
  slug: "life-leech",
  title: "Life Leech",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
