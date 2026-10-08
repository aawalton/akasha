import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const steelskin = {
  id: "01a06572-95e3-7cb7-8278-000b2fbfcb09",
  type: "page-type/world-spell",
  slug: "steelskin",
  title: "Steelskin",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.427Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
