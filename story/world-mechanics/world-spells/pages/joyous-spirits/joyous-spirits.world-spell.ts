import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const joyousSpirits = {
  id: "01a06572-95cc-7486-a230-0609f809139c",
  type: "world-spell",
  slug: "joyous-spirits",
  title: "Joyous Spirits",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
