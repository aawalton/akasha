import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const deathblast = {
  id: "01a06572-95bc-76b7-a25c-6b9014be16a3",
  type: "world-spell",
  slug: "deathblast",
  title: "Deathblast",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
