import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const incinerationRay = {
  id: "01a06572-95cb-76aa-b90b-cce979c49ea6",
  type: "page-type/world-spell",
  slug: "incineration-ray",
  title: "Incineration Ray",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
