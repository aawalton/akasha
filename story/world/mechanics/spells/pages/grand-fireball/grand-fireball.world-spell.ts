import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const grandFireball = {
  id: "01a06572-95c6-734a-8062-ff497688ca95",
  type: "page-type/world-spell",
  slug: "grand-fireball",
  title: "Grand Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
