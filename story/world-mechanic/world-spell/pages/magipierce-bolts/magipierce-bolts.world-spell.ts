import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const magipierceBolts = {
  id: "01a06572-95d1-7bf3-bd1e-744f8e0f51d4",
  type: "world-spell",
  slug: "magipierce-bolts",
  title: "Magipierce Bolts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
