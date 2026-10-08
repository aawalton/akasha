import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const incendiaryDarts = {
  id: "01a06572-95cb-72f2-ac23-21f4fba94b9f",
  type: "page-type/world-spell",
  slug: "incendiary-darts",
  title: "Incendiary Darts",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
