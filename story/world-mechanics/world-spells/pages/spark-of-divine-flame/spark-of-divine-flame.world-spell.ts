import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sparkOfDivineFlame = {
  id: "01a06572-95e1-71ca-8659-8ec02bf5abd1",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "spark-of-divine-flame",
  title: "Spark of Divine Flame",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
