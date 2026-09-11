import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const piercer = {
  id: "01a06572-95da-7d46-a7ca-e34611e5fdbc",
  type: "world-spell",
  slug: "piercer",
  title: "Piercer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
