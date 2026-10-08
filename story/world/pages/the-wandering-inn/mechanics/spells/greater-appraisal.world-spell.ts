import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greaterAppraisal = {
  id: "01a06572-95c7-780d-bddb-c9997a259f37",
  type: "page-type/world-spell",
  slug: "greater-appraisal",
  title: "Greater Appraisal",
  world: "world/the-wandering-inn",
  appearanceCount: 8,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.399Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
