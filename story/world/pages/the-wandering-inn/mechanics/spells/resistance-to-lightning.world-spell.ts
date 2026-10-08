import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const resistanceToLightning = {
  id: "01a06572-95dd-7e54-a9cc-33b99397126e",
  type: "page-type/world-spell",
  slug: "resistance-to-lightning",
  title: "Resistance to Lightning",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.421Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
