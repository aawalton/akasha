import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const incendiaryDarts = {
  id: "01a06572-95cb-72f2-ac23-21f4fba94b9f",
  type: "world-spell",
  slug: "incendiary-darts",
  title: "Incendiary Darts",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
