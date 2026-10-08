import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const featherhop = {
  id: "01a06572-95c0-7e14-8857-9a789eb08aa2",
  type: "page-type/world-spell",
  slug: "featherhop",
  title: "Featherhop",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
