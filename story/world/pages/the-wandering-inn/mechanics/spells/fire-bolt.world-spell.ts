import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fireBolt = {
  id: "01a06572-95c0-764c-b1b1-341874792c5f",
  type: "page-type/world-spell",
  slug: "fire-bolt",
  title: "Fire Bolt",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.392Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
