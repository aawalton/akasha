import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const refinedAppraisal = {
  id: "01a06572-95dc-76c6-a7b8-4f10ff65d60f",
  type: "world-spell",
  slug: "refined-appraisal",
  title: "Refined Appraisal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
