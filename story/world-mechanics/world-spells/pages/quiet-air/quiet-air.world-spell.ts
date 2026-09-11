import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const quietAir = {
  id: "01a06572-95db-7d51-8af3-d541cba66b87",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "quiet-air",
  title: "Quiet Air",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
