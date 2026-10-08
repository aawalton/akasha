import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mend = {
  id: "01a06572-95d2-7f8f-beaf-a2698b48a26f",
  type: "page-type/world-spell",
  slug: "mend",
  title: "Mend",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.410Z",
  updatedAt: "2026-09-22T13:34:49.000Z",
} as const satisfies WorldSpell
