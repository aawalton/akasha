import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const eyesOfClarity = {
  id: "01a06572-95bf-711e-a21f-328814cb282a",
  type: "page-type/world-spell",
  slug: "eyes-of-clarity",
  title: "Eyes of Clarity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
