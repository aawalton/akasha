import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterAppraisal = {
  id: "01a06572-95c7-780d-bddb-c9997a259f37",
  type: "world-spell",
  slug: "greater-appraisal",
  title: "Greater Appraisal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
