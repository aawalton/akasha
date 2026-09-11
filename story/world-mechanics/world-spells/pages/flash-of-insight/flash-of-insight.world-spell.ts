import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashOfInsight = {
  id: "01a06572-95c3-714d-9d1b-1796a4d4f654",
  type: "world-spell",
  slug: "flash-of-insight",
  title: "Flash of Insight",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
