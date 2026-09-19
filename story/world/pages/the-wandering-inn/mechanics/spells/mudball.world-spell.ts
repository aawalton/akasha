import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mudball = {
  id: "01a06572-95d9-75a3-a797-e98fd8681c92",
  type: "page-type/world-spell",
  slug: "mudball",
  title: "Mudball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
